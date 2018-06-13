package com.mbgarage.rpt.service;

import com.mbgarage.rpt.service.dto.RestorationQueryDTO;
import java.util.List;

/**
 * Service Interface for managing RestorationQuery.
 */
public interface RestorationQueryService {

    /**
     * Save a restorationQuery.
     *
     * @param restorationQueryDTO the entity to save
     * @return the persisted entity
     */
    RestorationQueryDTO save(RestorationQueryDTO restorationQueryDTO);

    /**
     * Get all the restorationQueries.
     *
     * @return the list of entities
     */
    List<RestorationQueryDTO> findAll();

    /**
     * Get the "id" restorationQuery.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RestorationQueryDTO findOne(Long id);

    /**
     * Delete the "id" restorationQuery.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
