package com.mbgarage.rpt.repository;

import com.mbgarage.rpt.domain.RestorationQuery;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RestorationQuery entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestorationQueryRepository extends JpaRepository<RestorationQuery, Long> {

}
