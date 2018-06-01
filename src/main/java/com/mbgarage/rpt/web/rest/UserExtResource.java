package com.mbgarage.rpt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mbgarage.rpt.service.UserExtService;
import com.mbgarage.rpt.web.rest.errors.BadRequestAlertException;
import com.mbgarage.rpt.web.rest.util.HeaderUtil;
import com.mbgarage.rpt.service.dto.UserExtDTO;
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
 * REST controller for managing UserExt.
 */
@RestController
@RequestMapping("/api")
public class UserExtResource {

    private final Logger log = LoggerFactory.getLogger(UserExtResource.class);

    private static final String ENTITY_NAME = "userExt";

    private final UserExtService userExtService;

    public UserExtResource(UserExtService userExtService) {
        this.userExtService = userExtService;
    }

    /**
     * POST  /user-exts : Create a new userExt.
     *
     * @param userExtDTO the userExtDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userExtDTO, or with status 400 (Bad Request) if the userExt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-exts")
    @Timed
    public ResponseEntity<UserExtDTO> createUserExt(@Valid @RequestBody UserExtDTO userExtDTO) throws URISyntaxException {
        log.debug("REST request to save UserExt : {}", userExtDTO);
        if (userExtDTO.getId() != null) {
            throw new BadRequestAlertException("A new userExt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserExtDTO result = userExtService.save(userExtDTO);
        return ResponseEntity.created(new URI("/api/user-exts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-exts : Updates an existing userExt.
     *
     * @param userExtDTO the userExtDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userExtDTO,
     * or with status 400 (Bad Request) if the userExtDTO is not valid,
     * or with status 500 (Internal Server Error) if the userExtDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-exts")
    @Timed
    public ResponseEntity<UserExtDTO> updateUserExt(@Valid @RequestBody UserExtDTO userExtDTO) throws URISyntaxException {
        log.debug("REST request to update UserExt : {}", userExtDTO);
        if (userExtDTO.getId() == null) {
            return createUserExt(userExtDTO);
        }
        UserExtDTO result = userExtService.save(userExtDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userExtDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-exts : get all the userExts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userExts in body
     */
    @GetMapping("/user-exts")
    @Timed
    public List<UserExtDTO> getAllUserExts() {
        log.debug("REST request to get all UserExts");
        return userExtService.findAll();
        }

    /**
     * GET  /user-exts/:id : get the "id" userExt.
     *
     * @param id the id of the userExtDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userExtDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-exts/{id}")
    @Timed
    public ResponseEntity<UserExtDTO> getUserExt(@PathVariable Long id) {
        log.debug("REST request to get UserExt : {}", id);
        UserExtDTO userExtDTO = userExtService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userExtDTO));
    }

    /**
     * DELETE  /user-exts/:id : delete the "id" userExt.
     *
     * @param id the id of the userExtDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-exts/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserExt(@PathVariable Long id) {
        log.debug("REST request to delete UserExt : {}", id);
        userExtService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
