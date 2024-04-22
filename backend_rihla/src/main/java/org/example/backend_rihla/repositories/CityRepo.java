package org.example.backend_rihla.repositories;

import org.example.backend_rihla.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepo extends JpaRepository<City, Long> {
    List<City> findCitiesByTitleContains(String str);
}
