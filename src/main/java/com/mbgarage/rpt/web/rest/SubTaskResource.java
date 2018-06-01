package com.mbgarage.rpt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mbgarage.rpt.service.SubTaskService;
import com.mbgarage.rpt.web.rest.errors.BadRequestAlertException;
import com.mbgarage.rpt.web.rest.util.HeaderUtil;
import com.mbgarage.rpt.service.dto.SubTaskDTO;
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
 * REST controller for managing SubTask.
 */
@RestController
@RequestMapping("/api")
public class SubTaskResource {

    private final Logger log = LoggerFactory.getLogger(SubTaskResource.class);

    private static final String ENTITY_NAME = "subTask";

    private final SubTaskService subTaskService;

    public SubTaskResource(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    /**
     * POST  /sub-tasks : Create a new subTask.
     *
     * @param subTaskDTO the subTaskDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subTaskDTO, or with status 400 (Bad Request) if the subTask has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-tasks")
    @Timed
    public ResponseEntity<SubTaskDTO> createSubTask(@Valid @RequestBody SubTaskDTO subTaskDTO) throws URISyntaxException {
        log.debug("REST request to save SubTask : {}", subTaskDTO);
        if (subTaskDTO.getId() != null) {
            throw new BadRequestAlertException("A new subTask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubTaskDTO result = subTaskService.save(subTaskDTO);
        return ResponseEntity.created(new URI("/api/sub-tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-tasks : Updates an existing subTask.
     *
     * @param subTaskDTO the subTaskDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subTaskDTO,
     * or with status 400 (Bad Request) if the subTaskDTO is not valid,
     * or with status 500 (Internal Server Error) if the subTaskDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-tasks")
    @Timed
    public ResponseEntity<SubTaskDTO> updateSubTask(@Valid @RequestBody SubTaskDTO subTaskDTO) throws URISyntaxException {
        log.debug("REST request to update SubTask : {}", subTaskDTO);
        if (subTaskDTO.getId() == null) {
            return createSubTask(subTaskDTO);
        }
        SubTaskDTO result = subTaskService.save(subTaskDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subTaskDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-tasks : get all the subTasks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subTasks in body
     */
    @GetMapping("/sub-tasks")
    @Timed
    public List<SubTaskDTO> getAllSubTasks() {
        log.debug("REST request to get all SubTasks");
        return subTaskService.findAll();
        }

    /**
     * GET  /sub-tasks/:id : get the "id" subTask.
     *
     * @param id the id of the subTaskDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subTaskDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sub-tasks/{id}")
    @Timed
    public ResponseEntity<SubTaskDTO> getSubTask(@PathVariable Long id) {
        log.debug("REST request to get SubTask : {}", id);
        SubTaskDTO subTaskDTO = subTaskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(subTaskDTO));
    }

    /**
     * DELETE  /sub-tasks/:id : delete the "id" subTask.
     *
     * @param id the id of the subTaskDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-tasks/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubTask(@PathVariable Long id) {
        log.debug("REST request to delete SubTask : {}", id);
        subTaskService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
