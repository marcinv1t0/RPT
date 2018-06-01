package com.mbgarage.rpt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Repair.
 */
@Entity
@Table(name = "repair")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Repair implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 15)
    @Column(name = "name", length = 15, nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_cost")
    private Long cost;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    @OneToMany(mappedBy = "repair")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubTask> subtasks = new HashSet<>();

    @OneToMany(mappedBy = "repair")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Photo> photos = new HashSet<>();

    @ManyToOne
    private Restoration restoration;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Repair name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Repair description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCost() {
        return cost;
    }

    public Repair cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Repair startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public Repair finishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public Set<SubTask> getSubtasks() {
        return subtasks;
    }

    public Repair subtasks(Set<SubTask> subTasks) {
        this.subtasks = subTasks;
        return this;
    }

    public Repair addSubtask(SubTask subTask) {
        this.subtasks.add(subTask);
        subTask.setRepair(this);
        return this;
    }

    public Repair removeSubtask(SubTask subTask) {
        this.subtasks.remove(subTask);
        subTask.setRepair(null);
        return this;
    }

    public void setSubtasks(Set<SubTask> subTasks) {
        this.subtasks = subTasks;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public Repair photos(Set<Photo> photos) {
        this.photos = photos;
        return this;
    }

    public Repair addPhoto(Photo photo) {
        this.photos.add(photo);
        photo.setRepair(this);
        return this;
    }

    public Repair removePhoto(Photo photo) {
        this.photos.remove(photo);
        photo.setRepair(null);
        return this;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public Restoration getRestoration() {
        return restoration;
    }

    public Repair restoration(Restoration restoration) {
        this.restoration = restoration;
        return this;
    }

    public void setRestoration(Restoration restoration) {
        this.restoration = restoration;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Repair repair = (Repair) o;
        if (repair.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repair.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Repair{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", cost=" + getCost() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            "}";
    }
}
