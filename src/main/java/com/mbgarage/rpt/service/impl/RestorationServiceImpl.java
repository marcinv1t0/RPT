package com.mbgarage.rpt.service.impl;

import com.mbgarage.rpt.service.RestorationService;
import com.mbgarage.rpt.domain.Restoration;
import com.mbgarage.rpt.repository.RestorationRepository;
import com.mbgarage.rpt.service.dto.RestorationDTO;
import com.mbgarage.rpt.service.mapper.RestorationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Restoration.
 */
@Service
@Transactional
public class RestorationServiceImpl implements RestorationService {

    private final Logger log = LoggerFactory.getLogger(RestorationServiceImpl.class);

    private final RestorationRepository restorationRepository;

    private final RestorationMapper restorationMapper;

    public RestorationServiceImpl(RestorationRepository restorationRepository, RestorationMapper restorationMapper) {
        this.restorationRepository = restorationRepository;
        this.restorationMapper = restorationMapper;
    }

    /**
     * Save a restoration.
     *
     * @param restorationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RestorationDTO save(RestorationDTO restorationDTO) {
        log.debug("Request to save Restoration : {}", restorationDTO);
        Restoration restoration = restorationMapper.toEntity(restorationDTO);
        restoration = restorationRepository.save(restoration);
        return restorationMapper.toDto(restoration);
    }

    /**
     * Get all the restorations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RestorationDTO> findAll() {
        log.debug("Request to get all Restorations");
        return restorationRepository.findAll().stream()
            .map(restorationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one restoration by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RestorationDTO findOne(Long id) {
        log.debug("Request to get Restoration : {}", id);
        Restoration restoration = restorationRepository.findOne(id);
        return restorationMapper.toDto(restoration);
    }

    /**
     * Delete the restoration by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Restoration : {}", id);
        restorationRepository.delete(id);
    }
}
