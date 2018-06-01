package com.mbgarage.rpt.service;

import com.mbgarage.rpt.service.dto.UserExtDTO;
import java.util.List;

/**
 * Service Interface for managing UserExt.
 */
public interface UserExtService {

    /**
     * Save a userExt.
     *
     * @param userExtDTO the entity to save
     * @return the persisted entity
     */
    UserExtDTO save(UserExtDTO userExtDTO);

    /**
     * Get all the userExts.
     *
     * @return the list of entities
     */
    List<UserExtDTO> findAll();

    /**
     * Get the "id" userExt.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UserExtDTO findOne(Long id);

    /**
     * Delete the "id" userExt.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
