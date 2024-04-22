package org.example.backend_rihla.web;

import org.example.backend_rihla.Util.JwtRequestFilter;
import org.example.backend_rihla.entities.City;
import org.example.backend_rihla.services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {
    @Autowired
    CityService cityService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend URL
    @GetMapping("")
    public List<City> findAll(){
        return cityService.getAllCitys();
    }


//    @CrossOrigin()
//    @PostMapping("/add")
//    public City ajouter(@RequestPart("city") City city, @RequestPart("imageFile") MultipartFile imageFile){
//        return cityService.add(city, imageFile);
//    }
@CrossOrigin()
@PostMapping("/add")
public City ajouter(@RequestParam("title") String title,
                    @RequestParam("description") String description,
                    @RequestParam("map") String map,
                    @RequestParam("image_file") MultipartFile imageFile,
                    @RequestHeader(value = "Authorization",required = false) final String authorizationHeader) {

    if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
        // Create a new City object and save it using the provided parameters
        City city = new City();
        city.setTitle(title);
        city.setDescription(description);
        city.setMap(map);

        // Save the image file logic goes here
        return cityService.add(city, imageFile);
    }else {
        City city1 = new City();
        return city1;
    }
}


    //----------------------------------
    @CrossOrigin()
    @PostMapping("/update/{id}")
    public City modification(@PathVariable Long id,
                             @RequestParam("title") String title,
                             @RequestParam("description") String description,
                             @RequestParam("map") String map,
                             @RequestParam(name = "image_file", required = false) MultipartFile imageFile,
                             @RequestHeader(value = "Authorization",required = false) final String authorizationHeader) {

        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            // Create a new City object and set its properties using the provided parameters
            City city = new City();
            city.setId(id); // Set the ID from the path variable
            city.setTitle(title);
            city.setDescription(description);
            city.setMap(map);
            // Save the image file logic goes here
            return cityService.updateCity(id, city, imageFile);
        }else {
            City city1 = new City();
            return city1;
        }
    }



    //-------------------------------------
    @CrossOrigin()
    @DeleteMapping("/delete/{id}")
    public void suppression(@PathVariable Long id,@RequestHeader(value = "Authorization",required = false) final String authorizationHeader){

        if(jwtRequestFilter.doFilter(authorizationHeader) !=null && jwtRequestFilter.doFilter(authorizationHeader).getRole().equals("admin")){
            cityService.deleteCity(id);
        }
    }
    //---------------------------------
    @CrossOrigin()
    @GetMapping("/findbyname/{str}")
    public List<City> recherchParNom(@PathVariable String str){
        return cityService.searchByName(str);
    }
}
