package com.mbgarage.rpt.service.impl;

import com.mbgarage.rpt.service.RepairService;
import com.mbgarage.rpt.domain.Repair;
import com.mbgarage.rpt.repository.RepairRepository;
import com.mbgarage.rpt.service.dto.RepairDTO;
import com.mbgarage.rpt.service.mapper.RepairMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Repair.
 */
@Service
@Transactional
public class RepairServiceImpl implements RepairService {

    private final Logger log = LoggerFactory.getLogger(RepairServiceImpl.class);

    private final RepairRepository repairRepository;

    private final RepairMapper repairMapper;

    public RepairServiceImpl(RepairRepository repairRepository, RepairMapper repairMapper) {
        this.repairRepository = repairRepository;
        this.repairMapper = repairMapper;
    }

    /**
     * Save a repair.
     *
     * @param repairDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RepairDTO save(RepairDTO repairDTO) {
        log.debug("Request to save Repair : {}", repairDTO);
        Repair repair = repairMapper.toEntity(repairDTO);
        repair = repairRepository.save(repair);
        return repairMapper.toDto(repair);
    }

    /**
     * Get all the repairs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RepairDTO> findAll() {
        log.debug("Request to get all Repairs");
        return repairRepository.findAll().stream()
            .map(repairMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one repair by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RepairDTO findOne(Long id) {
        log.debug("Request to get Repair : {}", id);
        Repair repair = repairRepository.findOne(id);
        return repairMapper.toDto(repair);
    }

    /**
     * Delete the repair by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Repair : {}", id);
        repairRepository.delete(id);
    }
}
