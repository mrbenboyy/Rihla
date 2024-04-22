package org.example.backend_rihla.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend_rihla.entities.City;
import org.example.backend_rihla.repositories.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpementation implements CityService {

    @Autowired
    private CityRepo cityRepo;

    @Value("${upload.dir}")
    private String uploadDir;

    @Override
    public City add(City city, MultipartFile imageFile) {
        try {
            String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);
            try (InputStream inputStream = imageFile.getInputStream()) {
                Files.copy(inputStream, uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
            }
            city.setImageFile(fileName);
            return cityRepo.save(city);
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file " + imageFile.getOriginalFilename(), ex);
        }
    }


    @Override
    public List<City> getAllCitys() {
        return cityRepo.findAll();
    }

    @Override
    public City updateCity(Long id, City newCity, MultipartFile newImageFile) {
        Optional<City> optionalCity = cityRepo.findById(id);
        if (optionalCity.isPresent()) {
            City city = optionalCity.get();
            city.setDescription(newCity.getDescription());
            city.setMap(newCity.getMap());
            city.setTitle(newCity.getTitle());

            if (newImageFile != null && !newImageFile.isEmpty()) {
                // Delete the old image file from the folder
                String oldImagePath = uploadDir + File.separator + city.getImageFile();
                File oldImageFile = new File(oldImagePath);
                if (oldImageFile.exists()) {
                    if (oldImageFile.delete()) {
                        System.out.println("Old image file deleted successfully");
                    } else {
                        System.out.println("Failed to delete the old image file");
                    }
                }

                // Upload the new image file
                try {
                    String fileName = StringUtils.cleanPath(newImageFile.getOriginalFilename());
                    Path uploadPath = Paths.get(uploadDir);
                    Files.createDirectories(uploadPath);
                    try (InputStream inputStream = newImageFile.getInputStream()) {
                        Files.copy(inputStream, uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
                    }
                    city.setImageFile(fileName);
                } catch (IOException ex) {
                    throw new RuntimeException("Failed to store file " + newImageFile.getOriginalFilename(), ex);
                }
            }

            return cityRepo.save(city);
        } else {
            throw new EntityNotFoundException("City with id=" + id + " doesn't exist!");
        }
    }



    @Override
    public void deleteCity(Long id) {
        Optional<City> optionalCity = cityRepo.findById(id);
        if (optionalCity.isPresent()) {
            City city = optionalCity.get();

            // Delete the image file from the folder
            String imagePath = uploadDir + File.separator + city.getImageFile();
            File imageFile = new File(imagePath);
            if (imageFile.exists()) {
                if (imageFile.delete()) {
                    System.out.println("Image file deleted successfully");
                } else {
                    System.out.println("Failed to delete the image file");
                }
            } else {
                System.out.println("Image file doesn't exist");
            }

            // Delete the City entity from the database
            cityRepo.delete(city);
        } else {
            throw new EntityNotFoundException("City with id=" + id + " doesn't exist!");
        }
    }



    @Override
    public List<City> searchByName(String str) {
        return cityRepo.findCitiesByTitleContains(str);
    }
}
