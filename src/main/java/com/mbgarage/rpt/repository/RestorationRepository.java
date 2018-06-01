package com.mbgarage.rpt.repository;

import com.mbgarage.rpt.domain.Restoration;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Restoration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestorationRepository extends JpaRepository<Restoration, Long> {

}
