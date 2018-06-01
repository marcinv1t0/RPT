package com.mbgarage.rpt.web.rest;

import com.mbgarage.rpt.RptApp;

import com.mbgarage.rpt.domain.Restoration;
import com.mbgarage.rpt.repository.RestorationRepository;
import com.mbgarage.rpt.service.RestorationService;
import com.mbgarage.rpt.service.dto.RestorationDTO;
import com.mbgarage.rpt.service.mapper.RestorationMapper;
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
 * Test class for the RestorationResource REST controller.
 *
 * @see RestorationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RptApp.class)
public class RestorationResourceIntTest {

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FINISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FINISH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_COST = 1L;
    private static final Long UPDATED_COST = 2L;

    @Autowired
    private RestorationRepository restorationRepository;

    @Autowired
    private RestorationMapper restorationMapper;

    @Autowired
    private RestorationService restorationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRestorationMockMvc;

    private Restoration restoration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestorationResource restorationResource = new RestorationResource(restorationService);
        this.restRestorationMockMvc = MockMvcBuilders.standaloneSetup(restorationResource)
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
    public static Restoration createEntity(EntityManager em) {
        Restoration restoration = new Restoration()
            .startDate(DEFAULT_START_DATE)
            .finishDate(DEFAULT_FINISH_DATE)
            .cost(DEFAULT_COST);
        return restoration;
    }

    @Before
    public void initTest() {
        restoration = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestoration() throws Exception {
        int databaseSizeBeforeCreate = restorationRepository.findAll().size();

        // Create the Restoration
        RestorationDTO restorationDTO = restorationMapper.toDto(restoration);
        restRestorationMockMvc.perform(post("/api/restorations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationDTO)))
            .andExpect(status().isCreated());

        // Validate the Restoration in the database
        List<Restoration> restorationList = restorationRepository.findAll();
        assertThat(restorationList).hasSize(databaseSizeBeforeCreate + 1);
        Restoration testRestoration = restorationList.get(restorationList.size() - 1);
        assertThat(testRestoration.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testRestoration.getFinishDate()).isEqualTo(DEFAULT_FINISH_DATE);
        assertThat(testRestoration.getCost()).isEqualTo(DEFAULT_COST);
    }

    @Test
    @Transactional
    public void createRestorationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restorationRepository.findAll().size();

        // Create the Restoration with an existing ID
        restoration.setId(1L);
        RestorationDTO restorationDTO = restorationMapper.toDto(restoration);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestorationMockMvc.perform(post("/api/restorations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Restoration in the database
        List<Restoration> restorationList = restorationRepository.findAll();
        assertThat(restorationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = restorationRepository.findAll().size();
        // set the field null
        restoration.setStartDate(null);

        // Create the Restoration, which fails.
        RestorationDTO restorationDTO = restorationMapper.toDto(restoration);

        restRestorationMockMvc.perform(post("/api/restorations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationDTO)))
            .andExpect(status().isBadRequest());

        List<Restoration> restorationList = restorationRepository.findAll();
        assertThat(restorationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRestorations() throws Exception {
        // Initialize the database
        restorationRepository.saveAndFlush(restoration);

        // Get all the restorationList
        restRestorationMockMvc.perform(get("/api/restorations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restoration.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.intValue())));
    }

    @Test
    @Transactional
    public void getRestoration() throws Exception {
        // Initialize the database
        restorationRepository.saveAndFlush(restoration);

        // Get the restoration
        restRestorationMockMvc.perform(get("/api/restorations/{id}", restoration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restoration.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.finishDate").value(DEFAULT_FINISH_DATE.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRestoration() throws Exception {
        // Get the restoration
        restRestorationMockMvc.perform(get("/api/restorations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestoration() throws Exception {
        // Initialize the database
        restorationRepository.saveAndFlush(restoration);
        int databaseSizeBeforeUpdate = restorationRepository.findAll().size();

        // Update the restoration
        Restoration updatedRestoration = restorationRepository.findOne(restoration.getId());
        // Disconnect from session so that the updates on updatedRestoration are not directly saved in db
        em.detach(updatedRestoration);
        updatedRestoration
            .startDate(UPDATED_START_DATE)
            .finishDate(UPDATED_FINISH_DATE)
            .cost(UPDATED_COST);
        RestorationDTO restorationDTO = restorationMapper.toDto(updatedRestoration);

        restRestorationMockMvc.perform(put("/api/restorations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationDTO)))
            .andExpect(status().isOk());

        // Validate the Restoration in the database
        List<Restoration> restorationList = restorationRepository.findAll();
        assertThat(restorationList).hasSize(databaseSizeBeforeUpdate);
        Restoration testRestoration = restorationList.get(restorationList.size() - 1);
        assertThat(testRestoration.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testRestoration.getFinishDate()).isEqualTo(UPDATED_FINISH_DATE);
        assertThat(testRestoration.getCost()).isEqualTo(UPDATED_COST);
    }

    @Test
    @Transactional
    public void updateNonExistingRestoration() throws Exception {
        int databaseSizeBeforeUpdate = restorationRepository.findAll().size();

        // Create the Restoration
        RestorationDTO restorationDTO = restorationMapper.toDto(restoration);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRestorationMockMvc.perform(put("/api/restorations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationDTO)))
            .andExpect(status().isCreated());

        // Validate the Restoration in the database
        List<Restoration> restorationList = restorationRepository.findAll();
        assertThat(restorationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRestoration() throws Exception {
        // Initialize the database
        restorationRepository.saveAndFlush(restoration);
        int databaseSizeBeforeDelete = restorationRepository.findAll().size();

        // Get the restoration
        restRestorationMockMvc.perform(delete("/api/restorations/{id}", restoration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Restoration> restorationList = restorationRepository.findAll();
        assertThat(restorationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Restoration.class);
        Restoration restoration1 = new Restoration();
        restoration1.setId(1L);
        Restoration restoration2 = new Restoration();
        restoration2.setId(restoration1.getId());
        assertThat(restoration1).isEqualTo(restoration2);
        restoration2.setId(2L);
        assertThat(restoration1).isNotEqualTo(restoration2);
        restoration1.setId(null);
        assertThat(restoration1).isNotEqualTo(restoration2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestorationDTO.class);
        RestorationDTO restorationDTO1 = new RestorationDTO();
        restorationDTO1.setId(1L);
        RestorationDTO restorationDTO2 = new RestorationDTO();
        assertThat(restorationDTO1).isNotEqualTo(restorationDTO2);
        restorationDTO2.setId(restorationDTO1.getId());
        assertThat(restorationDTO1).isEqualTo(restorationDTO2);
        restorationDTO2.setId(2L);
        assertThat(restorationDTO1).isNotEqualTo(restorationDTO2);
        restorationDTO1.setId(null);
        assertThat(restorationDTO1).isNotEqualTo(restorationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(restorationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(restorationMapper.fromId(null)).isNull();
    }
}
