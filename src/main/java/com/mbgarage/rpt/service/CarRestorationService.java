package com.mbgarage.rpt.service;

import com.mbgarage.rpt.service.dto.CarRestorationDTO;

import java.util.List;

public interface CarRestorationService {
    /**
     * Save a restoration.
     *
     * @param restorationDTO the entity to save
     * @return the persisted entity
     */
    CarRestorationDTO save(CarRestorationDTO restorationDTO);

    /**
     * Get all the restorations.
     *
     * @return the list of entities
     */
    List<CarRestorationDTO> findAll();

    /**
     * Get the "id" restoration.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CarRestorationDTO findOne(Long id);

    /**
     * Delete the "id" restoration.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
