package com.mbgarage.rpt.repository;

import com.mbgarage.rpt.domain.SubTask;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SubTask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubTaskRepository extends JpaRepository<SubTask, Long> {

}
