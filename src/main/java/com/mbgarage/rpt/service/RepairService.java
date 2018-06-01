package com.mbgarage.rpt.service;

import com.mbgarage.rpt.service.dto.RepairDTO;
import java.util.List;

/**
 * Service Interface for managing Repair.
 */
public interface RepairService {

    /**
     * Save a repair.
     *
     * @param repairDTO the entity to save
     * @return the persisted entity
     */
    RepairDTO save(RepairDTO repairDTO);

    /**
     * Get all the repairs.
     *
     * @return the list of entities
     */
    List<RepairDTO> findAll();

    /**
     * Get the "id" repair.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RepairDTO findOne(Long id);

    /**
     * Delete the "id" repair.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
