package com.mbgarage.rpt.service;

import com.mbgarage.rpt.service.dto.SubTaskDTO;
import java.util.List;

/**
 * Service Interface for managing SubTask.
 */
public interface SubTaskService {

    /**
     * Save a subTask.
     *
     * @param subTaskDTO the entity to save
     * @return the persisted entity
     */
    SubTaskDTO save(SubTaskDTO subTaskDTO);

    /**
     * Get all the subTasks.
     *
     * @return the list of entities
     */
    List<SubTaskDTO> findAll();

    /**
     * Get the "id" subTask.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SubTaskDTO findOne(Long id);

    /**
     * Delete the "id" subTask.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
