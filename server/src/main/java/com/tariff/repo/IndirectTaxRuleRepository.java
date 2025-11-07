package com.tariff.repo;

import com.tariff.domain.IndirectTaxRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IndirectTaxRuleRepository extends JpaRepository<IndirectTaxRule, Long> {
    
    List<IndirectTaxRule> findByCountryIso2(String countryIso2);
    
    List<IndirectTaxRule> findByTaxType(String taxType);
    
    List<IndirectTaxRule> findByCountryIso2AndTaxType(String countryIso2, String taxType);
    
    Optional<IndirectTaxRule> findByCountryIso2AndTaxTypeAndValidFromLessThanEqualAndValidToGreaterThanEqual(
            String countryIso2, String taxType, LocalDate date, LocalDate date2);
    
    List<IndirectTaxRule> findByValidFromLessThanEqualAndValidToGreaterThanEqual(LocalDate date, LocalDate date2);
    
    boolean existsByCountryIso2AndTaxTypeAndValidFromLessThanEqualAndValidToGreaterThanEqual(
            String countryIso2, String taxType, LocalDate date, LocalDate date2);
}