package com.mbgarage.rpt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mbgarage.rpt.service.RestorationQueryService;
import com.mbgarage.rpt.service.UserExtService;
import com.mbgarage.rpt.service.UserService;
import com.mbgarage.rpt.service.dto.UserDTO;
import com.mbgarage.rpt.service.dto.UserExtDTO;
import com.mbgarage.rpt.web.rest.errors.BadRequestAlertException;
import com.mbgarage.rpt.web.rest.errors.InternalServerErrorException;
import com.mbgarage.rpt.web.rest.util.HeaderUtil;
import com.mbgarage.rpt.service.dto.RestorationQueryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RestorationQuery.
 */
@RestController
@RequestMapping("/api")
public class RestorationQueryResource {

    private final Logger log = LoggerFactory.getLogger(RestorationQueryResource.class);

    private static final String ENTITY_NAME = "restorationQuery";

    private final RestorationQueryService restorationQueryService;

    private final UserService userService;

    private final UserExtService userExtService;

    public RestorationQueryResource(RestorationQueryService restorationQueryService, UserService userService, UserExtService userExtService) {
        this.restorationQueryService = restorationQueryService;
        this.userService = userService;
        this.userExtService = userExtService;
    }

    /**
     * POST  /restoration-queries : Create a new restorationQuery.
     *
     * @param restorationQueryDTO the restorationQueryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new restorationQueryDTO, or with status 400 (Bad Request) if the restorationQuery has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/restoration-queries")
    @Timed
    public ResponseEntity<RestorationQueryDTO> createRestorationQuery(@Valid @RequestBody RestorationQueryDTO restorationQueryDTO) throws URISyntaxException {
        log.debug("REST request to save RestorationQuery : {}", restorationQueryDTO);
        if (restorationQueryDTO.getId() != null) {
            throw new BadRequestAlertException("A new restorationQuery cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = auth.getName();

        log.debug("REST request to get User : {}", login);
        UserDTO userDTO = userService.getUserWithAuthorities()
            .map(UserDTO::new)
            .orElseThrow(() -> new InternalServerErrorException("User could not be found"));

        UserExtDTO userExtDTO = userExtService.findOne(userDTO.getId());
        restorationQueryDTO.setCustomerId(userExtDTO.getUserId());

        RestorationQueryDTO result = restorationQueryService.save(restorationQueryDTO);
        return ResponseEntity.created(new URI("/api/restoration-queries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /restoration-queries : Updates an existing restorationQuery.
     *
     * @param restorationQueryDTO the restorationQueryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated restorationQueryDTO,
     * or with status 400 (Bad Request) if the restorationQueryDTO is not valid,
     * or with status 500 (Internal Server Error) if the restorationQueryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/restoration-queries")
    @Timed
    public ResponseEntity<RestorationQueryDTO> updateRestorationQuery(@Valid @RequestBody RestorationQueryDTO restorationQueryDTO) throws URISyntaxException {
        log.debug("REST request to update RestorationQuery : {}", restorationQueryDTO);
        if (restorationQueryDTO.getId() == null) {
            return createRestorationQuery(restorationQueryDTO);
        }
        RestorationQueryDTO result = restorationQueryService.save(restorationQueryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, restorationQueryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /restoration-queries : get all the restorationQueries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of restorationQueries in body
     */
    @GetMapping("/restoration-queries")
    @Timed
    public List<RestorationQueryDTO> getAllRestorationQueries() {
        log.debug("REST request to get all RestorationQueries");
        return restorationQueryService.findAll();
        }

    /**
     * GET  /restoration-queries/:id : get the "id" restorationQuery.
     *
     * @param id the id of the restorationQueryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the restorationQueryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/restoration-queries/{id}")
    @Timed
    public ResponseEntity<RestorationQueryDTO> getRestorationQuery(@PathVariable Long id) {
        log.debug("REST request to get RestorationQuery : {}", id);
        RestorationQueryDTO restorationQueryDTO = restorationQueryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(restorationQueryDTO));
    }

    /**
     * DELETE  /restoration-queries/:id : delete the "id" restorationQuery.
     *
     * @param id the id of the restorationQueryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/restoration-queries/{id}")
    @Timed
    public ResponseEntity<Void> deleteRestorationQuery(@PathVariable Long id) {
        log.debug("REST request to delete RestorationQuery : {}", id);
        restorationQueryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
