package com.tariff.api;

import com.tariff.api.dto.ApiResponse;
import com.tariff.domain.Country;
import com.tariff.repo.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/countries")
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Country>>> getAllCountries() {
        List<Country> countries = countryRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Countries retrieved successfully", countries));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Country>> getCountry(@PathVariable Long id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));
        return ResponseEntity.ok(ApiResponse.success("Country retrieved successfully", country));
    }

    @GetMapping("/by-code/{countryCode}")
    public ResponseEntity<ApiResponse<Country>> getCountryByCode(@PathVariable String countryCode) {
        Country country = countryRepository.findByCountryCode(countryCode)
                .orElseThrow(() -> new RuntimeException("Country not found for code: " + countryCode));
        return ResponseEntity.ok(ApiResponse.success("Country retrieved successfully", country));
    }

    @GetMapping("/by-region/{region}")
    public ResponseEntity<ApiResponse<List<Country>>> getCountriesByRegion(@PathVariable String region) {
        List<Country> countries = countryRepository.findByRegion(region);
        return ResponseEntity.ok(ApiResponse.success("Countries retrieved successfully", countries));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Country>>> searchCountries(@RequestParam String query) {
        List<Country> countries = countryRepository.findByCountryNameContainingIgnoreCase(query);
        return ResponseEntity.ok(ApiResponse.success("Countries search results", countries));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Country>> createCountry(@RequestBody Country country) {
        Country savedCountry = countryRepository.save(country);
        return ResponseEntity.ok(ApiResponse.success("Country created successfully", savedCountry));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Country>> updateCountry(@PathVariable Long id,
            @RequestBody Country countryDetails) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));
        country.setCountryCode(countryDetails.getCountryCode());
        country.setCountryName(countryDetails.getCountryName());
        country.setRegion(countryDetails.getRegion());
        Country updatedCountry = countryRepository.save(country);
        return ResponseEntity.ok(ApiResponse.success("Country updated successfully", updatedCountry));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCountry(@PathVariable Long id) {
        countryRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Country deleted successfully", null));
    }
}