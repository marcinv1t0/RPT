package com.mbgarage.rpt.service.impl;

import com.mbgarage.rpt.service.UserExtService;
import com.mbgarage.rpt.domain.UserExt;
import com.mbgarage.rpt.repository.UserExtRepository;
import com.mbgarage.rpt.service.dto.UserExtDTO;
import com.mbgarage.rpt.service.mapper.UserExtMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing UserExt.
 */
@Service
@Transactional
public class UserExtServiceImpl implements UserExtService {

    private final Logger log = LoggerFactory.getLogger(UserExtServiceImpl.class);

    private final UserExtRepository userExtRepository;

    private final UserExtMapper userExtMapper;

    public UserExtServiceImpl(UserExtRepository userExtRepository, UserExtMapper userExtMapper) {
        this.userExtRepository = userExtRepository;
        this.userExtMapper = userExtMapper;
    }

    /**
     * Save a userExt.
     *
     * @param userExtDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserExtDTO save(UserExtDTO userExtDTO) {
        log.debug("Request to save UserExt : {}", userExtDTO);
        UserExt userExt = userExtMapper.toEntity(userExtDTO);
        userExt = userExtRepository.save(userExt);
        return userExtMapper.toDto(userExt);
    }

    /**
     * Get all the userExts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserExtDTO> findAll() {
        log.debug("Request to get all UserExts");
        return userExtRepository.findAll().stream()
            .map(userExtMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userExt by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserExtDTO findOne(Long id) {
        log.debug("Request to get UserExt : {}", id);
        UserExt userExt = userExtRepository.findOne(id);
        return userExtMapper.toDto(userExt);
    }

    /**
     * Delete the userExt by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserExt : {}", id);
        userExtRepository.delete(id);
    }
}
