package com.mbgarage.rpt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mbgarage.rpt.domain.Photo;
import com.mbgarage.rpt.service.PhotoService;
import com.mbgarage.rpt.service.RepairService;
import com.mbgarage.rpt.service.dto.PhotoDTO;
import com.mbgarage.rpt.web.rest.errors.BadRequestAlertException;
import com.mbgarage.rpt.web.rest.util.HeaderUtil;
import com.mbgarage.rpt.service.dto.RepairDTO;
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
import java.util.stream.Collectors;

/**
 * REST controller for managing Repair.
 */
@RestController
@RequestMapping("/api")
public class RepairResource {

    private final Logger log = LoggerFactory.getLogger(RepairResource.class);

    private static final String ENTITY_NAME = "repair";

    private final RepairService repairService;
    private final PhotoService photoService;


    public RepairResource(RepairService repairService, PhotoService photoService) {
        this.repairService = repairService;
        this.photoService = photoService;
    }

    /**
     * POST  /repairs : Create a new repair.
     *
     * @param repairDTO the repairDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new repairDTO, or with status 400 (Bad Request) if the repair has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/repairs")
    @Timed
    public ResponseEntity<RepairDTO> createRepair(@Valid @RequestBody RepairDTO repairDTO) throws URISyntaxException {
        log.debug("REST request to save Repair : {}", repairDTO);
        if (repairDTO.getId() != null) {
            throw new BadRequestAlertException("A new repair cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepairDTO result = repairService.save(repairDTO);
        return ResponseEntity.created(new URI("/api/repairs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /repairs : Updates an existing repair.
     *
     * @param repairDTO the repairDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated repairDTO,
     * or with status 400 (Bad Request) if the repairDTO is not valid,
     * or with status 500 (Internal Server Error) if the repairDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/repairs")
    @Timed
    public ResponseEntity<RepairDTO> updateRepair(@Valid @RequestBody RepairDTO repairDTO) throws URISyntaxException {
        log.debug("REST request to update Repair : {}", repairDTO);
        if (repairDTO.getId() == null) {
            return createRepair(repairDTO);
        }
        RepairDTO result = repairService.save(repairDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, repairDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /repairs : get all the repairs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of repairs in body
     */
    @GetMapping("/repairs")
    @Timed
    public List<RepairDTO> getAllRepairs() {
        log.debug("REST request to get all Repairs");
        return repairService.findAll();
        }

    /**
     * GET  /repairs/:id : get the "id" repair.
     *
     * @param id the id of the repairDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the repairDTO, or with status 404 (Not Found)
     */
    @GetMapping("/repairs/{id}")
    @Timed
    public ResponseEntity<RepairDTO> getRepair(@PathVariable Long id) {
        log.debug("REST request to get Repair : {}", id);
        RepairDTO repairDTO = repairService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(repairDTO));
    }

    /**
     * DELETE  /repairs/:id : delete the "id" repair.
     *
     * @param id the id of the repairDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/repairs/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepair(@PathVariable Long id) {
        log.debug("REST request to delete Repair : {}", id);
        List<PhotoDTO> photos = photoService.findAll();
        photos = (List<PhotoDTO>) photos.stream()
            .filter(p -> p.getRepairId().equals(id))
            .collect(Collectors.toList());
        for (PhotoDTO photo : photos) {
            photoService.delete(photo.getId());
        }
        repairService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
