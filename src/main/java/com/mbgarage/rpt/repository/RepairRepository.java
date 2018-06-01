package com.mbgarage.rpt.repository;

import com.mbgarage.rpt.domain.Repair;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Repair entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepairRepository extends JpaRepository<Repair, Long> {

}
