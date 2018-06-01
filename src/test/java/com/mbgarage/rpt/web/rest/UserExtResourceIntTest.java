package com.mbgarage.rpt.web.rest;

import com.mbgarage.rpt.RptApp;

import com.mbgarage.rpt.domain.UserExt;
import com.mbgarage.rpt.repository.UserExtRepository;
import com.mbgarage.rpt.service.UserExtService;
import com.mbgarage.rpt.service.dto.UserExtDTO;
import com.mbgarage.rpt.service.mapper.UserExtMapper;
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

import com.mbgarage.rpt.domain.enumeration.AcountType;
/**
 * Test class for the UserExtResource REST controller.
 *
 * @see UserExtResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RptApp.class)
public class UserExtResourceIntTest {

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final AcountType DEFAULT_ACOUNT_TYPE = AcountType.EMPLOYEE;
    private static final AcountType UPDATED_ACOUNT_TYPE = AcountType.MASTER;

    @Autowired
    private UserExtRepository userExtRepository;

    @Autowired
    private UserExtMapper userExtMapper;

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

    private MockMvc restUserExtMockMvc;

    private UserExt userExt;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserExtResource userExtResource = new UserExtResource(userExtService);
        this.restUserExtMockMvc = MockMvcBuilders.standaloneSetup(userExtResource)
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
    public static UserExt createEntity(EntityManager em) {
        UserExt userExt = new UserExt()
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .acountType(DEFAULT_ACOUNT_TYPE);
        return userExt;
    }

    @Before
    public void initTest() {
        userExt = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserExt() throws Exception {
        int databaseSizeBeforeCreate = userExtRepository.findAll().size();

        // Create the UserExt
        UserExtDTO userExtDTO = userExtMapper.toDto(userExt);
        restUserExtMockMvc.perform(post("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtDTO)))
            .andExpect(status().isCreated());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeCreate + 1);
        UserExt testUserExt = userExtList.get(userExtList.size() - 1);
        assertThat(testUserExt.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testUserExt.getAcountType()).isEqualTo(DEFAULT_ACOUNT_TYPE);
    }

    @Test
    @Transactional
    public void createUserExtWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userExtRepository.findAll().size();

        // Create the UserExt with an existing ID
        userExt.setId(1L);
        UserExtDTO userExtDTO = userExtMapper.toDto(userExt);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserExtMockMvc.perform(post("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAcountTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = userExtRepository.findAll().size();
        // set the field null
        userExt.setAcountType(null);

        // Create the UserExt, which fails.
        UserExtDTO userExtDTO = userExtMapper.toDto(userExt);

        restUserExtMockMvc.perform(post("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtDTO)))
            .andExpect(status().isBadRequest());

        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserExts() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);

        // Get all the userExtList
        restUserExtMockMvc.perform(get("/api/user-exts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExt.getId().intValue())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].acountType").value(hasItem(DEFAULT_ACOUNT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getUserExt() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);

        // Get the userExt
        restUserExtMockMvc.perform(get("/api/user-exts/{id}", userExt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userExt.getId().intValue()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.acountType").value(DEFAULT_ACOUNT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserExt() throws Exception {
        // Get the userExt
        restUserExtMockMvc.perform(get("/api/user-exts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserExt() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);
        int databaseSizeBeforeUpdate = userExtRepository.findAll().size();

        // Update the userExt
        UserExt updatedUserExt = userExtRepository.findOne(userExt.getId());
        // Disconnect from session so that the updates on updatedUserExt are not directly saved in db
        em.detach(updatedUserExt);
        updatedUserExt
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .acountType(UPDATED_ACOUNT_TYPE);
        UserExtDTO userExtDTO = userExtMapper.toDto(updatedUserExt);

        restUserExtMockMvc.perform(put("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtDTO)))
            .andExpect(status().isOk());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeUpdate);
        UserExt testUserExt = userExtList.get(userExtList.size() - 1);
        assertThat(testUserExt.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testUserExt.getAcountType()).isEqualTo(UPDATED_ACOUNT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserExt() throws Exception {
        int databaseSizeBeforeUpdate = userExtRepository.findAll().size();

        // Create the UserExt
        UserExtDTO userExtDTO = userExtMapper.toDto(userExt);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserExtMockMvc.perform(put("/api/user-exts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtDTO)))
            .andExpect(status().isCreated());

        // Validate the UserExt in the database
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserExt() throws Exception {
        // Initialize the database
        userExtRepository.saveAndFlush(userExt);
        int databaseSizeBeforeDelete = userExtRepository.findAll().size();

        // Get the userExt
        restUserExtMockMvc.perform(delete("/api/user-exts/{id}", userExt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserExt> userExtList = userExtRepository.findAll();
        assertThat(userExtList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExt.class);
        UserExt userExt1 = new UserExt();
        userExt1.setId(1L);
        UserExt userExt2 = new UserExt();
        userExt2.setId(userExt1.getId());
        assertThat(userExt1).isEqualTo(userExt2);
        userExt2.setId(2L);
        assertThat(userExt1).isNotEqualTo(userExt2);
        userExt1.setId(null);
        assertThat(userExt1).isNotEqualTo(userExt2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtDTO.class);
        UserExtDTO userExtDTO1 = new UserExtDTO();
        userExtDTO1.setId(1L);
        UserExtDTO userExtDTO2 = new UserExtDTO();
        assertThat(userExtDTO1).isNotEqualTo(userExtDTO2);
        userExtDTO2.setId(userExtDTO1.getId());
        assertThat(userExtDTO1).isEqualTo(userExtDTO2);
        userExtDTO2.setId(2L);
        assertThat(userExtDTO1).isNotEqualTo(userExtDTO2);
        userExtDTO1.setId(null);
        assertThat(userExtDTO1).isNotEqualTo(userExtDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userExtMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userExtMapper.fromId(null)).isNull();
    }
}
