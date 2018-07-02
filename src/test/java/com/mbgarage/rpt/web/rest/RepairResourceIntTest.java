package com.mbgarage.rpt.web.rest;

import com.mbgarage.rpt.RptApp;

import com.mbgarage.rpt.domain.Repair;
import com.mbgarage.rpt.repository.RepairRepository;
import com.mbgarage.rpt.service.PhotoService;
import com.mbgarage.rpt.service.RepairService;
import com.mbgarage.rpt.service.dto.RepairDTO;
import com.mbgarage.rpt.service.mapper.RepairMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mbgarage.rpt.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RepairResource REST controller.
 *
 * @see RepairResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RptApp.class)
public class RepairResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_COST = 1L;
    private static final Long UPDATED_COST = 2L;

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FINISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FINISH_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RepairRepository repairRepository;

    @Autowired
    private RepairMapper repairMapper;

    @Autowired
    private RepairService repairService;

    @Autowired
    private PhotoService photoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRepairMockMvc;

    private Repair repair;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepairResource repairResource = new RepairResource(repairService, photoService);
        this.restRepairMockMvc = MockMvcBuilders.standaloneSetup(repairResource)
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
    public static Repair createEntity(EntityManager em) {
        Repair repair = new Repair()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .cost(DEFAULT_COST)
            .startDate(DEFAULT_START_DATE)
            .finishDate(DEFAULT_FINISH_DATE);
        return repair;
    }

    @Before
    public void initTest() {
        repair = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepair() throws Exception {
        int databaseSizeBeforeCreate = repairRepository.findAll().size();

        // Create the Repair
        RepairDTO repairDTO = repairMapper.toDto(repair);
        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isCreated());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeCreate + 1);
        Repair testRepair = repairList.get(repairList.size() - 1);
        assertThat(testRepair.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRepair.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRepair.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testRepair.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testRepair.getFinishDate()).isEqualTo(DEFAULT_FINISH_DATE);
    }

    @Test
    @Transactional
    public void createRepairWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repairRepository.findAll().size();

        // Create the Repair with an existing ID
        repair.setId(1L);
        RepairDTO repairDTO = repairMapper.toDto(repair);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = repairRepository.findAll().size();
        // set the field null
        repair.setName(null);

        // Create the Repair, which fails.
        RepairDTO repairDTO = repairMapper.toDto(repair);

        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isBadRequest());

        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = repairRepository.findAll().size();
        // set the field null
        repair.setStartDate(null);

        // Create the Repair, which fails.
        RepairDTO repairDTO = repairMapper.toDto(repair);

        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isBadRequest());

        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRepairs() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);

        // Get all the repairList
        restRepairMockMvc.perform(get("/api/repairs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repair.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())));
    }

    @Test
    @Transactional
    public void getRepair() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);

        // Get the repair
        restRepairMockMvc.perform(get("/api/repairs/{id}", repair.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(repair.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.finishDate").value(DEFAULT_FINISH_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRepair() throws Exception {
        // Get the repair
        restRepairMockMvc.perform(get("/api/repairs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepair() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);
        int databaseSizeBeforeUpdate = repairRepository.findAll().size();

        // Update the repair
        Repair updatedRepair = repairRepository.findOne(repair.getId());
        // Disconnect from session so that the updates on updatedRepair are not directly saved in db
        em.detach(updatedRepair);
        updatedRepair
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .cost(UPDATED_COST)
            .startDate(UPDATED_START_DATE)
            .finishDate(UPDATED_FINISH_DATE);
        RepairDTO repairDTO = repairMapper.toDto(updatedRepair);

        restRepairMockMvc.perform(put("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isOk());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeUpdate);
        Repair testRepair = repairList.get(repairList.size() - 1);
        assertThat(testRepair.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRepair.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRepair.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testRepair.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testRepair.getFinishDate()).isEqualTo(UPDATED_FINISH_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingRepair() throws Exception {
        int databaseSizeBeforeUpdate = repairRepository.findAll().size();

        // Create the Repair
        RepairDTO repairDTO = repairMapper.toDto(repair);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRepairMockMvc.perform(put("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isCreated());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRepair() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);
        int databaseSizeBeforeDelete = repairRepository.findAll().size();

        // Get the repair
        restRepairMockMvc.perform(delete("/api/repairs/{id}", repair.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Repair.class);
        Repair repair1 = new Repair();
        repair1.setId(1L);
        Repair repair2 = new Repair();
        repair2.setId(repair1.getId());
        assertThat(repair1).isEqualTo(repair2);
        repair2.setId(2L);
        assertThat(repair1).isNotEqualTo(repair2);
        repair1.setId(null);
        assertThat(repair1).isNotEqualTo(repair2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepairDTO.class);
        RepairDTO repairDTO1 = new RepairDTO();
        repairDTO1.setId(1L);
        RepairDTO repairDTO2 = new RepairDTO();
        assertThat(repairDTO1).isNotEqualTo(repairDTO2);
        repairDTO2.setId(repairDTO1.getId());
        assertThat(repairDTO1).isEqualTo(repairDTO2);
        repairDTO2.setId(2L);
        assertThat(repairDTO1).isNotEqualTo(repairDTO2);
        repairDTO1.setId(null);
        assertThat(repairDTO1).isNotEqualTo(repairDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(repairMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(repairMapper.fromId(null)).isNull();
    }
}
