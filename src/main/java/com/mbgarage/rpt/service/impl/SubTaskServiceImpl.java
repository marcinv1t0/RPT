package com.mbgarage.rpt.service.impl;

import com.mbgarage.rpt.service.SubTaskService;
import com.mbgarage.rpt.domain.SubTask;
import com.mbgarage.rpt.repository.SubTaskRepository;
import com.mbgarage.rpt.service.dto.SubTaskDTO;
import com.mbgarage.rpt.service.mapper.SubTaskMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SubTask.
 */
@Service
@Transactional
public class SubTaskServiceImpl implements SubTaskService {

    private final Logger log = LoggerFactory.getLogger(SubTaskServiceImpl.class);

    private final SubTaskRepository subTaskRepository;

    private final SubTaskMapper subTaskMapper;

    public SubTaskServiceImpl(SubTaskRepository subTaskRepository, SubTaskMapper subTaskMapper) {
        this.subTaskRepository = subTaskRepository;
        this.subTaskMapper = subTaskMapper;
    }

    /**
     * Save a subTask.
     *
     * @param subTaskDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubTaskDTO save(SubTaskDTO subTaskDTO) {
        log.debug("Request to save SubTask : {}", subTaskDTO);
        SubTask subTask = subTaskMapper.toEntity(subTaskDTO);
        subTask = subTaskRepository.save(subTask);
        return subTaskMapper.toDto(subTask);
    }

    /**
     * Get all the subTasks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SubTaskDTO> findAll() {
        log.debug("Request to get all SubTasks");
        return subTaskRepository.findAll().stream()
            .map(subTaskMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one subTask by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SubTaskDTO findOne(Long id) {
        log.debug("Request to get SubTask : {}", id);
        SubTask subTask = subTaskRepository.findOne(id);
        return subTaskMapper.toDto(subTask);
    }

    /**
     * Delete the subTask by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubTask : {}", id);
        subTaskRepository.delete(id);
    }
}
