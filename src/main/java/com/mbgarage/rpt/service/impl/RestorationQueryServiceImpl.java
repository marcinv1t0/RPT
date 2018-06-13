package com.mbgarage.rpt.service.impl;

import com.mbgarage.rpt.service.RestorationQueryService;
import com.mbgarage.rpt.domain.RestorationQuery;
import com.mbgarage.rpt.repository.RestorationQueryRepository;
import com.mbgarage.rpt.service.dto.RestorationQueryDTO;
import com.mbgarage.rpt.service.mapper.RestorationQueryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing RestorationQuery.
 */
@Service
@Transactional
public class RestorationQueryServiceImpl implements RestorationQueryService {

    private final Logger log = LoggerFactory.getLogger(RestorationQueryServiceImpl.class);

    private final RestorationQueryRepository restorationQueryRepository;

    private final RestorationQueryMapper restorationQueryMapper;

    public RestorationQueryServiceImpl(RestorationQueryRepository restorationQueryRepository, RestorationQueryMapper restorationQueryMapper) {
        this.restorationQueryRepository = restorationQueryRepository;
        this.restorationQueryMapper = restorationQueryMapper;
    }

    /**
     * Save a restorationQuery.
     *
     * @param restorationQueryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RestorationQueryDTO save(RestorationQueryDTO restorationQueryDTO) {
        log.debug("Request to save RestorationQuery : {}", restorationQueryDTO);
        RestorationQuery restorationQuery = restorationQueryMapper.toEntity(restorationQueryDTO);
        restorationQuery = restorationQueryRepository.save(restorationQuery);
        return restorationQueryMapper.toDto(restorationQuery);
    }

    /**
     * Get all the restorationQueries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RestorationQueryDTO> findAll() {
        log.debug("Request to get all RestorationQueries");
        return restorationQueryRepository.findAll().stream()
            .map(restorationQueryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one restorationQuery by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RestorationQueryDTO findOne(Long id) {
        log.debug("Request to get RestorationQuery : {}", id);
        RestorationQuery restorationQuery = restorationQueryRepository.findOne(id);
        return restorationQueryMapper.toDto(restorationQuery);
    }

    /**
     * Delete the restorationQuery by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RestorationQuery : {}", id);
        restorationQueryRepository.delete(id);
    }
}
