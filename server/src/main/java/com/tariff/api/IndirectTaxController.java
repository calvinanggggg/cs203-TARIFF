package com.tariff.api;

import com.tariff.api.dto.ApiResponse;
import com.tariff.domain.IndirectTaxRule;
import com.tariff.repo.IndirectTaxRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/indirect-tax-rules")
public class IndirectTaxController {

    @Autowired
    private IndirectTaxRuleRepository indirectTaxRuleRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<IndirectTaxRule>>> getAllIndirectTaxRules() {
        List<IndirectTaxRule> rules = indirectTaxRuleRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Indirect tax rules retrieved successfully", rules));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IndirectTaxRule>> getIndirectTaxRule(@PathVariable Long id) {
        IndirectTaxRule rule = indirectTaxRuleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Indirect tax rule not found"));
        return ResponseEntity.ok(ApiResponse.success("Indirect tax rule retrieved successfully", rule));
    }

    @GetMapping("/by-country/{countryIso2}")
    public ResponseEntity<ApiResponse<List<IndirectTaxRule>>> getIndirectTaxRulesByCountry(@PathVariable String countryIso2) {
        List<IndirectTaxRule> rules = indirectTaxRuleRepository.findByCountryIso2(countryIso2);
        return ResponseEntity.ok(ApiResponse.success("Indirect tax rules retrieved successfully", rules));
    }

    @GetMapping("/by-tax-type/{taxType}")
    public ResponseEntity<ApiResponse<List<IndirectTaxRule>>> getIndirectTaxRulesByTaxType(@PathVariable String taxType) {
        List<IndirectTaxRule> rules = indirectTaxRuleRepository.findByTaxType(taxType);
        return ResponseEntity.ok(ApiResponse.success("Indirect tax rules retrieved successfully", rules));
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse<List<IndirectTaxRule>>> getCurrentIndirectTaxRules() {
        LocalDate currentDate = LocalDate.now();
        List<IndirectTaxRule> rules = indirectTaxRuleRepository.findByValidFromLessThanEqualAndValidToGreaterThanEqual(
                currentDate, currentDate);
        return ResponseEntity.ok(ApiResponse.success("Current indirect tax rules retrieved successfully", rules));
    }

    @GetMapping("/current/{countryIso2}")
    public ResponseEntity<ApiResponse<IndirectTaxRule>> getCurrentIndirectTaxRuleForCountry(@PathVariable String countryIso2) {
        LocalDate currentDate = LocalDate.now();
        IndirectTaxRule rule = indirectTaxRuleRepository
                .findByCountryIso2AndTaxTypeAndValidFromLessThanEqualAndValidToGreaterThanEqual(
                        countryIso2, "GST", currentDate, currentDate)
                .orElseThrow(() -> new RuntimeException("No current GST rule found for country: " + countryIso2));
        return ResponseEntity.ok(ApiResponse.success("Current indirect tax rule retrieved successfully", rule));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<IndirectTaxRule>> createIndirectTaxRule(@RequestBody IndirectTaxRule rule) {
        IndirectTaxRule savedRule = indirectTaxRuleRepository.save(rule);
        return ResponseEntity.ok(ApiResponse.success("Indirect tax rule created successfully", savedRule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IndirectTaxRule>> updateIndirectTaxRule(@PathVariable Long id,
            @RequestBody IndirectTaxRule ruleDetails) {
        IndirectTaxRule rule = indirectTaxRuleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Indirect tax rule not found"));
        rule.setCountryIso2(ruleDetails.getCountryIso2());
        rule.setTaxType(ruleDetails.getTaxType());
        rule.setRateValue(ruleDetails.getRateValue());
        rule.setRateUnit(ruleDetails.getRateUnit());
        rule.setValidFrom(ruleDetails.getValidFrom());
        rule.setValidTo(ruleDetails.getValidTo());
        IndirectTaxRule updatedRule = indirectTaxRuleRepository.save(rule);
        return ResponseEntity.ok(ApiResponse.success("Indirect tax rule updated successfully", updatedRule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIndirectTaxRule(@PathVariable Long id) {
        indirectTaxRuleRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Indirect tax rule deleted successfully", null));
    }
}