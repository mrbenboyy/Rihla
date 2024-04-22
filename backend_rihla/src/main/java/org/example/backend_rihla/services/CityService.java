package org.example.backend_rihla.services;

import org.example.backend_rihla.entities.City;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CityService {
    City add(City city,  MultipartFile imageFile);
    List<City> getAllCitys();
    City updateCity(Long id, City newCity, MultipartFile newImageFile);
    void deleteCity(Long id);
    List<City> searchByName(String str);
}
