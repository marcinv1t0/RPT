package com.mbgarage.rpt.service.impl;

import com.mbgarage.rpt.service.PhotoService;
import com.mbgarage.rpt.domain.Photo;
import com.mbgarage.rpt.repository.PhotoRepository;
import com.mbgarage.rpt.service.dto.PhotoDTO;
import com.mbgarage.rpt.service.mapper.PhotoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Photo.
 */
@Service
@Transactional
public class PhotoServiceImpl implements PhotoService {

    private final Logger log = LoggerFactory.getLogger(PhotoServiceImpl.class);

    private final PhotoRepository photoRepository;

    private final PhotoMapper photoMapper;

    public PhotoServiceImpl(PhotoRepository photoRepository, PhotoMapper photoMapper) {
        this.photoRepository = photoRepository;
        this.photoMapper = photoMapper;
    }

    /**
     * Save a photo.
     *
     * @param photoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PhotoDTO save(PhotoDTO photoDTO) {
        log.debug("Request to save Photo : {}", photoDTO);
        Photo photo = photoMapper.toEntity(photoDTO);
        photo = photoRepository.save(photo);
        return photoMapper.toDto(photo);
    }

    /**
     * Get all the photos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PhotoDTO> findAll() {
        log.debug("Request to get all Photos");
        return photoRepository.findAll().stream()
            .map(photoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one photo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PhotoDTO findOne(Long id) {
        log.debug("Request to get Photo : {}", id);
        Photo photo = photoRepository.findOne(id);
        return photoMapper.toDto(photo);
    }

    /**
     * Delete the photo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Photo : {}", id);
        photoRepository.delete(id);
    }
}
