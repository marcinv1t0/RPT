package com.mbgarage.rpt.service;

import com.mbgarage.rpt.service.dto.RestorationDTO;
import java.util.List;

/**
 * Service Interface for managing Restoration.
 */
public interface RestorationService {

    /**
     * Save a restoration.
     *
     * @param restorationDTO the entity to save
     * @return the persisted entity
     */
    RestorationDTO save(RestorationDTO restorationDTO);

    /**
     * Get all the restorations.
     *
     * @return the list of entities
     */
    List<RestorationDTO> findAll();

    /**
     * Get the "id" restoration.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RestorationDTO findOne(Long id);

    /**
     * Delete the "id" restoration.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
