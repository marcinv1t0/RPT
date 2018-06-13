package com.mbgarage.rpt.web.rest;

import com.mbgarage.rpt.RptApp;

import com.mbgarage.rpt.domain.RestorationQuery;
import com.mbgarage.rpt.repository.RestorationQueryRepository;
import com.mbgarage.rpt.service.RestorationQueryService;
import com.mbgarage.rpt.service.UserExtService;
import com.mbgarage.rpt.service.UserService;
import com.mbgarage.rpt.service.dto.RestorationQueryDTO;
import com.mbgarage.rpt.service.mapper.RestorationQueryMapper;
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
 * Test class for the RestorationQueryResource REST controller.
 *
 * @see RestorationQueryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RptApp.class)
public class RestorationQueryResourceIntTest {

    private static final String DEFAULT_MAKE = "AAAAAAAAAA";
    private static final String UPDATED_MAKE = "BBBBBBBBBB";

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    private static final String DEFAULT_VIN = "AAAAAAAAAA";
    private static final String UPDATED_VIN = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PRODUCTION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PRODUCTION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RestorationQueryRepository restorationQueryRepository;

    @Autowired
    private RestorationQueryMapper restorationQueryMapper;

    @Autowired
    private RestorationQueryService restorationQueryService;

    @Autowired

    private UserService userService;

    @Autowired
    private UserExtService userExtService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRestorationQueryMockMvc;

    private RestorationQuery restorationQuery;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestorationQueryResource restorationQueryResource = new RestorationQueryResource(restorationQueryService, userService, userExtService);
        this.restRestorationQueryMockMvc = MockMvcBuilders.standaloneSetup(restorationQueryResource)
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
    public static RestorationQuery createEntity(EntityManager em) {
        RestorationQuery restorationQuery = new RestorationQuery()
            .make(DEFAULT_MAKE)
            .model(DEFAULT_MODEL)
            .vin(DEFAULT_VIN)
            .productionDate(DEFAULT_PRODUCTION_DATE)
            .description(DEFAULT_DESCRIPTION);
        return restorationQuery;
    }

    @Before
    public void initTest() {
        restorationQuery = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestorationQuery() throws Exception {
        int databaseSizeBeforeCreate = restorationQueryRepository.findAll().size();

        // Create the RestorationQuery
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(restorationQuery);
        restRestorationQueryMockMvc.perform(post("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isCreated());

        // Validate the RestorationQuery in the database
        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeCreate + 1);
        RestorationQuery testRestorationQuery = restorationQueryList.get(restorationQueryList.size() - 1);
        assertThat(testRestorationQuery.getMake()).isEqualTo(DEFAULT_MAKE);
        assertThat(testRestorationQuery.getModel()).isEqualTo(DEFAULT_MODEL);
        assertThat(testRestorationQuery.getVin()).isEqualTo(DEFAULT_VIN);
        assertThat(testRestorationQuery.getProductionDate()).isEqualTo(DEFAULT_PRODUCTION_DATE);
        assertThat(testRestorationQuery.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createRestorationQueryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restorationQueryRepository.findAll().size();

        // Create the RestorationQuery with an existing ID
        restorationQuery.setId(1L);
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(restorationQuery);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestorationQueryMockMvc.perform(post("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RestorationQuery in the database
        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMakeIsRequired() throws Exception {
        int databaseSizeBeforeTest = restorationQueryRepository.findAll().size();
        // set the field null
        restorationQuery.setMake(null);

        // Create the RestorationQuery, which fails.
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(restorationQuery);

        restRestorationQueryMockMvc.perform(post("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isBadRequest());

        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkModelIsRequired() throws Exception {
        int databaseSizeBeforeTest = restorationQueryRepository.findAll().size();
        // set the field null
        restorationQuery.setModel(null);

        // Create the RestorationQuery, which fails.
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(restorationQuery);

        restRestorationQueryMockMvc.perform(post("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isBadRequest());

        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProductionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = restorationQueryRepository.findAll().size();
        // set the field null
        restorationQuery.setProductionDate(null);

        // Create the RestorationQuery, which fails.
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(restorationQuery);

        restRestorationQueryMockMvc.perform(post("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isBadRequest());

        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = restorationQueryRepository.findAll().size();
        // set the field null
        restorationQuery.setDescription(null);

        // Create the RestorationQuery, which fails.
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(restorationQuery);

        restRestorationQueryMockMvc.perform(post("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isBadRequest());

        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRestorationQueries() throws Exception {
        // Initialize the database
        restorationQueryRepository.saveAndFlush(restorationQuery);

        // Get all the restorationQueryList
        restRestorationQueryMockMvc.perform(get("/api/restoration-queries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restorationQuery.getId().intValue())))
            .andExpect(jsonPath("$.[*].make").value(hasItem(DEFAULT_MAKE.toString())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())))
            .andExpect(jsonPath("$.[*].vin").value(hasItem(DEFAULT_VIN.toString())))
            .andExpect(jsonPath("$.[*].productionDate").value(hasItem(DEFAULT_PRODUCTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getRestorationQuery() throws Exception {
        // Initialize the database
        restorationQueryRepository.saveAndFlush(restorationQuery);

        // Get the restorationQuery
        restRestorationQueryMockMvc.perform(get("/api/restoration-queries/{id}", restorationQuery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restorationQuery.getId().intValue()))
            .andExpect(jsonPath("$.make").value(DEFAULT_MAKE.toString()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()))
            .andExpect(jsonPath("$.vin").value(DEFAULT_VIN.toString()))
            .andExpect(jsonPath("$.productionDate").value(DEFAULT_PRODUCTION_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRestorationQuery() throws Exception {
        // Get the restorationQuery
        restRestorationQueryMockMvc.perform(get("/api/restoration-queries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestorationQuery() throws Exception {
        // Initialize the database
        restorationQueryRepository.saveAndFlush(restorationQuery);
        int databaseSizeBeforeUpdate = restorationQueryRepository.findAll().size();

        // Update the restorationQuery
        RestorationQuery updatedRestorationQuery = restorationQueryRepository.findOne(restorationQuery.getId());
        // Disconnect from session so that the updates on updatedRestorationQuery are not directly saved in db
        em.detach(updatedRestorationQuery);
        updatedRestorationQuery
            .make(UPDATED_MAKE)
            .model(UPDATED_MODEL)
            .vin(UPDATED_VIN)
            .productionDate(UPDATED_PRODUCTION_DATE)
            .description(UPDATED_DESCRIPTION);
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(updatedRestorationQuery);

        restRestorationQueryMockMvc.perform(put("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isOk());

        // Validate the RestorationQuery in the database
        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeUpdate);
        RestorationQuery testRestorationQuery = restorationQueryList.get(restorationQueryList.size() - 1);
        assertThat(testRestorationQuery.getMake()).isEqualTo(UPDATED_MAKE);
        assertThat(testRestorationQuery.getModel()).isEqualTo(UPDATED_MODEL);
        assertThat(testRestorationQuery.getVin()).isEqualTo(UPDATED_VIN);
        assertThat(testRestorationQuery.getProductionDate()).isEqualTo(UPDATED_PRODUCTION_DATE);
        assertThat(testRestorationQuery.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRestorationQuery() throws Exception {
        int databaseSizeBeforeUpdate = restorationQueryRepository.findAll().size();

        // Create the RestorationQuery
        RestorationQueryDTO restorationQueryDTO = restorationQueryMapper.toDto(restorationQuery);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRestorationQueryMockMvc.perform(put("/api/restoration-queries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restorationQueryDTO)))
            .andExpect(status().isCreated());

        // Validate the RestorationQuery in the database
        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRestorationQuery() throws Exception {
        // Initialize the database
        restorationQueryRepository.saveAndFlush(restorationQuery);
        int databaseSizeBeforeDelete = restorationQueryRepository.findAll().size();

        // Get the restorationQuery
        restRestorationQueryMockMvc.perform(delete("/api/restoration-queries/{id}", restorationQuery.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RestorationQuery> restorationQueryList = restorationQueryRepository.findAll();
        assertThat(restorationQueryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestorationQuery.class);
        RestorationQuery restorationQuery1 = new RestorationQuery();
        restorationQuery1.setId(1L);
        RestorationQuery restorationQuery2 = new RestorationQuery();
        restorationQuery2.setId(restorationQuery1.getId());
        assertThat(restorationQuery1).isEqualTo(restorationQuery2);
        restorationQuery2.setId(2L);
        assertThat(restorationQuery1).isNotEqualTo(restorationQuery2);
        restorationQuery1.setId(null);
        assertThat(restorationQuery1).isNotEqualTo(restorationQuery2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestorationQueryDTO.class);
        RestorationQueryDTO restorationQueryDTO1 = new RestorationQueryDTO();
        restorationQueryDTO1.setId(1L);
        RestorationQueryDTO restorationQueryDTO2 = new RestorationQueryDTO();
        assertThat(restorationQueryDTO1).isNotEqualTo(restorationQueryDTO2);
        restorationQueryDTO2.setId(restorationQueryDTO1.getId());
        assertThat(restorationQueryDTO1).isEqualTo(restorationQueryDTO2);
        restorationQueryDTO2.setId(2L);
        assertThat(restorationQueryDTO1).isNotEqualTo(restorationQueryDTO2);
        restorationQueryDTO1.setId(null);
        assertThat(restorationQueryDTO1).isNotEqualTo(restorationQueryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(restorationQueryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(restorationQueryMapper.fromId(null)).isNull();
    }
}
