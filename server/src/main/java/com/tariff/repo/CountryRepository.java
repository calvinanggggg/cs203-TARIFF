package com.tariff.repo;

import com.tariff.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    
    Optional<Country> findByCountryCode(String countryCode);
    
    List<Country> findByCountryNameContainingIgnoreCase(String countryName);
    
    List<Country> findByRegion(String region);
    
    List<Country> findByRegionContainingIgnoreCase(String region);
    
    boolean existsByCountryCode(String countryCode);
}