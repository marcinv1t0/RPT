package com.mbgarage.rpt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mbgarage.rpt.service.RestorationService;
import com.mbgarage.rpt.web.rest.errors.BadRequestAlertException;
import com.mbgarage.rpt.web.rest.util.HeaderUtil;
import com.mbgarage.rpt.service.dto.RestorationDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Restoration.
 */
@RestController
@RequestMapping("/api")
public class RestorationResource {

    private final Logger log = LoggerFactory.getLogger(RestorationResource.class);

    private static final String ENTITY_NAME = "restoration";

    private final RestorationService restorationService;

    public RestorationResource(RestorationService restorationService) {
        this.restorationService = restorationService;
    }

    /**
     * POST  /restorations : Create a new restoration.
     *
     * @param restorationDTO the restorationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new restorationDTO, or with status 400 (Bad Request) if the restoration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/restorations")
    @Timed
    public ResponseEntity<RestorationDTO> createRestoration(@Valid @RequestBody RestorationDTO restorationDTO) throws URISyntaxException {
        log.debug("REST request to save Restoration : {}", restorationDTO);
        if (restorationDTO.getId() != null) {
            throw new BadRequestAlertException("A new restoration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RestorationDTO result = restorationService.save(restorationDTO);
        return ResponseEntity.created(new URI("/api/restorations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /restorations : Updates an existing restoration.
     *
     * @param restorationDTO the restorationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated restorationDTO,
     * or with status 400 (Bad Request) if the restorationDTO is not valid,
     * or with status 500 (Internal Server Error) if the restorationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/restorations")
    @Timed
    public ResponseEntity<RestorationDTO> updateRestoration(@Valid @RequestBody RestorationDTO restorationDTO) throws URISyntaxException {
        log.debug("REST request to update Restoration : {}", restorationDTO);
        if (restorationDTO.getId() == null) {
            return createRestoration(restorationDTO);
        }
        RestorationDTO result = restorationService.save(restorationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, restorationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /restorations : get all the restorations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of restorations in body
     */
    @GetMapping("/restorations")
    @Timed
    public List<RestorationDTO> getAllRestorations() {
        log.debug("REST request to get all Restorations");
        return restorationService.findAll();
        }

    /**
     * GET  /restorations/:id : get the "id" restoration.
     *
     * @param id the id of the restorationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the restorationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/restorations/{id}")
    @Timed
    public ResponseEntity<RestorationDTO> getRestoration(@PathVariable Long id) {
        log.debug("REST request to get Restoration : {}", id);
        RestorationDTO restorationDTO = restorationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(restorationDTO));
    }

    /**
     * DELETE  /restorations/:id : delete the "id" restoration.
     *
     * @param id the id of the restorationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/restorations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRestoration(@PathVariable Long id) {
        log.debug("REST request to delete Restoration : {}", id);
        restorationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
