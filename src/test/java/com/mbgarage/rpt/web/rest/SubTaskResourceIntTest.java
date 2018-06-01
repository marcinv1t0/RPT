package com.mbgarage.rpt.web.rest;

import com.mbgarage.rpt.RptApp;

import com.mbgarage.rpt.domain.SubTask;
import com.mbgarage.rpt.repository.SubTaskRepository;
import com.mbgarage.rpt.service.SubTaskService;
import com.mbgarage.rpt.service.dto.SubTaskDTO;
import com.mbgarage.rpt.service.mapper.SubTaskMapper;
import com.mbgarage.rpt.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mbgarage.rpt.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SubTaskResource REST controller.
 *
 * @see SubTaskResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RptApp.class)
public class SubTaskResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SubTaskRepository subTaskRepository;

    @Autowired
    private SubTaskMapper subTaskMapper;

    @Autowired
    private SubTaskService subTaskService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubTaskMockMvc;

    private SubTask subTask;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubTaskResource subTaskResource = new SubTaskResource(subTaskService);
        this.restSubTaskMockMvc = MockMvcBuilders.standaloneSetup(subTaskResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubTask createEntity(EntityManager em) {
        SubTask subTask = new SubTask()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return subTask;
    }

    @Before
    public void initTest() {
        subTask = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubTask() throws Exception {
        int databaseSizeBeforeCreate = subTaskRepository.findAll().size();

        // Create the SubTask
        SubTaskDTO subTaskDTO = subTaskMapper.toDto(subTask);
        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTaskDTO)))
            .andExpect(status().isCreated());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeCreate + 1);
        SubTask testSubTask = subTaskList.get(subTaskList.size() - 1);
        assertThat(testSubTask.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSubTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subTaskRepository.findAll().size();

        // Create the SubTask with an existing ID
        subTask.setId(1L);
        SubTaskDTO subTaskDTO = subTaskMapper.toDto(subTask);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTaskDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subTaskRepository.findAll().size();
        // set the field null
        subTask.setName(null);

        // Create the SubTask, which fails.
        SubTaskDTO subTaskDTO = subTaskMapper.toDto(subTask);

        restSubTaskMockMvc.perform(post("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTaskDTO)))
            .andExpect(status().isBadRequest());

        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubTasks() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);

        // Get all the subTaskList
        restSubTaskMockMvc.perform(get("/api/sub-tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subTask.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getSubTask() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);

        // Get the subTask
        restSubTaskMockMvc.perform(get("/api/sub-tasks/{id}", subTask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subTask.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubTask() throws Exception {
        // Get the subTask
        restSubTaskMockMvc.perform(get("/api/sub-tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubTask() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);
        int databaseSizeBeforeUpdate = subTaskRepository.findAll().size();

        // Update the subTask
        SubTask updatedSubTask = subTaskRepository.findOne(subTask.getId());
        // Disconnect from session so that the updates on updatedSubTask are not directly saved in db
        em.detach(updatedSubTask);
        updatedSubTask
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        SubTaskDTO subTaskDTO = subTaskMapper.toDto(updatedSubTask);

        restSubTaskMockMvc.perform(put("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTaskDTO)))
            .andExpect(status().isOk());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeUpdate);
        SubTask testSubTask = subTaskList.get(subTaskList.size() - 1);
        assertThat(testSubTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSubTask() throws Exception {
        int databaseSizeBeforeUpdate = subTaskRepository.findAll().size();

        // Create the SubTask
        SubTaskDTO subTaskDTO = subTaskMapper.toDto(subTask);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubTaskMockMvc.perform(put("/api/sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTaskDTO)))
            .andExpect(status().isCreated());

        // Validate the SubTask in the database
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubTask() throws Exception {
        // Initialize the database
        subTaskRepository.saveAndFlush(subTask);
        int databaseSizeBeforeDelete = subTaskRepository.findAll().size();

        // Get the subTask
        restSubTaskMockMvc.perform(delete("/api/sub-tasks/{id}", subTask.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubTask> subTaskList = subTaskRepository.findAll();
        assertThat(subTaskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubTask.class);
        SubTask subTask1 = new SubTask();
        subTask1.setId(1L);
        SubTask subTask2 = new SubTask();
        subTask2.setId(subTask1.getId());
        assertThat(subTask1).isEqualTo(subTask2);
        subTask2.setId(2L);
        assertThat(subTask1).isNotEqualTo(subTask2);
        subTask1.setId(null);
        assertThat(subTask1).isNotEqualTo(subTask2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubTaskDTO.class);
        SubTaskDTO subTaskDTO1 = new SubTaskDTO();
        subTaskDTO1.setId(1L);
        SubTaskDTO subTaskDTO2 = new SubTaskDTO();
        assertThat(subTaskDTO1).isNotEqualTo(subTaskDTO2);
        subTaskDTO2.setId(subTaskDTO1.getId());
        assertThat(subTaskDTO1).isEqualTo(subTaskDTO2);
        subTaskDTO2.setId(2L);
        assertThat(subTaskDTO1).isNotEqualTo(subTaskDTO2);
        subTaskDTO1.setId(null);
        assertThat(subTaskDTO1).isNotEqualTo(subTaskDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subTaskMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subTaskMapper.fromId(null)).isNull();
    }
}
