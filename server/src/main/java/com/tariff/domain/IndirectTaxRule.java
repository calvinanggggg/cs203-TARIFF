package com.tariff.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "indirect_tax_rules")
public class IndirectTaxRule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "country_iso2", nullable = false, length = 2)
    private String countryIso2;
    
    @Column(name = "tax_type", nullable = false, length = 20)
    private String taxType;
    
    @Column(name = "rate_value", nullable = false, precision = 12, scale = 6)
    private BigDecimal rateValue;
    
    @Column(name = "rate_unit", nullable = false, length = 10)
    private String rateUnit;
    
    @Column(name = "valid_from", nullable = false)
    private LocalDate validFrom;
    
    @Column(name = "valid_to")
    private LocalDate validTo;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public IndirectTaxRule() {}
    
    public IndirectTaxRule(String countryIso2, String taxType, BigDecimal rateValue, 
                          String rateUnit, LocalDate validFrom, LocalDate validTo) {
        this.countryIso2 = countryIso2;
        this.taxType = taxType;
        this.rateValue = rateValue;
        this.rateUnit = rateUnit;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCountryIso2() {
        return countryIso2;
    }
    
    public void setCountryIso2(String countryIso2) {
        this.countryIso2 = countryIso2;
    }
    
    public String getTaxType() {
        return taxType;
    }
    
    public void setTaxType(String taxType) {
        this.taxType = taxType;
    }
    
    public BigDecimal getRateValue() {
        return rateValue;
    }
    
    public void setRateValue(BigDecimal rateValue) {
        this.rateValue = rateValue;
    }
    
    public String getRateUnit() {
        return rateUnit;
    }
    
    public void setRateUnit(String rateUnit) {
        this.rateUnit = rateUnit;
    }
    
    public LocalDate getValidFrom() {
        return validFrom;
    }
    
    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }
    
    public LocalDate getValidTo() {
        return validTo;
    }
    
    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}