package com.harvesthub.config;

import com.harvesthub.model.Crop;
import com.harvesthub.model.Equipment;
import com.harvesthub.model.Expense;
import com.harvesthub.model.Farm;
import com.harvesthub.model.Field;
import com.harvesthub.model.FieldOperation;
import com.harvesthub.model.Maintenance;
import com.harvesthub.model.Rotation;
import com.harvesthub.model.User;
import com.harvesthub.model.YieldRecord;
import com.harvesthub.repository.CropRepository;
import com.harvesthub.repository.EquipmentRepository;
import com.harvesthub.repository.ExpenseRepository;
import com.harvesthub.repository.FarmRepository;
import com.harvesthub.repository.FieldRepository;
import com.harvesthub.repository.MaintenanceRepository;
import com.harvesthub.repository.OperationRepository;
import com.harvesthub.repository.RotationRepository;
import com.harvesthub.repository.UserRepository;
import com.harvesthub.repository.YieldRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Fills an empty database with a demo account (demo@gmail.com / password123)
 * and the same sample data the frontend shows, so the project is ready to demonstrate.
 * Turn off with app.seed-demo-data=false.
 */
@Component
@ConditionalOnProperty(name = "app.seed-demo-data", havingValue = "true")
public class DemoDataSeeder implements CommandLineRunner {

    private final UserRepository users;
    private final FarmRepository farms;
    private final FieldRepository fields;
    private final CropRepository crops;
    private final RotationRepository rotations;
    private final OperationRepository operations;
    private final ExpenseRepository expenses;
    private final YieldRepository yields;
    private final EquipmentRepository equipment;
    private final MaintenanceRepository maintenance;
    private final PasswordEncoder passwordEncoder;

    public DemoDataSeeder(UserRepository users, FarmRepository farms, FieldRepository fields,
                          CropRepository crops, RotationRepository rotations, OperationRepository operations,
                          ExpenseRepository expenses, YieldRepository yields, EquipmentRepository equipment,
                          MaintenanceRepository maintenance, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.farms = farms;
        this.fields = fields;
        this.crops = crops;
        this.rotations = rotations;
        this.operations = operations;
        this.expenses = expenses;
        this.yields = yields;
        this.equipment = equipment;
        this.maintenance = maintenance;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (users.count() > 0) return;

        User user = new User();
        user.setFullName("Ravi Kumar");
        user.setEmail("demo@gmail.com");
        user.setPhone("9876543210");
        user.setPassword(passwordEncoder.encode("password123"));
        String uid = users.save(user).getId();

        String greenValley = farm(uid, "Green Valley Farm", "Nashik, Maharashtra", 45);
        String sunrise = farm(uid, "Sunrise Acres", "Ludhiana, Punjab", 30);
        String riverBend = farm(uid, "River Bend Farm", "Mysuru, Karnataka", 22);

        String north = field(uid, "North Field", greenValley, 12, "Loamy");
        String south = field(uid, "South Field", greenValley, 15, "Clay");
        String east = field(uid, "East Plot", sunrise, 10, "Sandy Loam");
        String west = field(uid, "West Plot", sunrise, 8, "Alluvial");
        String riverside = field(uid, "Riverside Field", riverBend, 9, "Black Soil");

        String wheat = crop(uid, "Wheat", "Rabi", 120, "Medium");
        String rice = crop(uid, "Rice", "Kharif", 150, "High");
        String potato = crop(uid, "Potato", "Rabi", 90, "Medium");
        String chickpea = crop(uid, "Chickpea", "Rabi", 100, "Low");
        String maize = crop(uid, "Maize", "Kharif", 110, "Medium");
        String watermelon = crop(uid, "Watermelon", "Zaid", 80, "High");

        rotation(uid, north, 2026, "Rabi", wheat);
        rotation(uid, north, 2027, "Rabi", potato);
        rotation(uid, north, 2028, "Rabi", chickpea);
        rotation(uid, south, 2026, "Kharif", rice);
        rotation(uid, south, 2027, "Kharif", rice);
        rotation(uid, east, 2026, "Kharif", maize);
        rotation(uid, riverside, 2026, "Zaid", watermelon);

        operation(uid, north, "Ploughing", "2026-09-20", "Deep ploughing before rabi sowing");
        operation(uid, north, "Sowing", "2026-10-05", "Sow HD-2967 wheat variety");
        operation(uid, south, "Harvesting", "2026-10-12", "Kharif rice harvest");
        operation(uid, east, "Irrigation", "2026-10-02", "Drip irrigation - 2 hours");
        operation(uid, west, "Fertilization", "2026-10-18", "Apply DAP 50 kg/acre");
        operation(uid, riverside, "Weeding", "2026-09-15", "Manual weeding");

        expense(uid, north, wheat, "Seeds", 18000, "2026-09-10", "Wheat seeds 400 kg");
        expense(uid, north, wheat, "Fertilizer", 12500, "2026-09-18", "Urea and DAP");
        expense(uid, south, rice, "Labour", 22000, "2026-08-25", "Transplanting labour");
        expense(uid, east, maize, "Irrigation", 6500, "2026-08-30", "Diesel for pump");
        expense(uid, south, rice, "Pesticide", 8200, "2026-09-05", "Stem borer control");

        yieldRecord(uid, south, rice, "2025-11-02", 360);
        yieldRecord(uid, north, wheat, "2026-04-10", 210);
        yieldRecord(uid, east, maize, "2025-10-20", 150);

        String tractor = equipment(uid, "Mahindra 575 DI", "Tractor", "Active", "2021-03-15");
        String pump = equipment(uid, "Kirloskar 5HP", "Water Pump", "Active", "2022-06-01");
        String harvester = equipment(uid, "Preet 987", "Harvester", "Under Maintenance", "2020-11-20");
        equipment(uid, "Knapsack Sprayer", "Sprayer", "Inactive", "2019-02-10");

        maintenance(uid, tractor, "2026-07-10", "2026-10-10", 4500, "Engine oil & filter change");
        maintenance(uid, harvester, "2026-09-22", "2026-10-05", 12000, "Blade replacement");
        maintenance(uid, pump, "2026-05-01", "2026-11-01", 1800, "Impeller cleaning");
        maintenance(uid, tractor, "2026-04-08", "2026-07-10", 3900, "Tyre check & greasing");

        System.out.println("HarvestHub: demo data created. Log in with demo@gmail.com / password123");
    }

    private String farm(String uid, String name, String location, double area) {
        Farm f = new Farm();
        f.setUserId(uid);
        f.setName(name);
        f.setLocation(location);
        f.setTotalArea(area);
        return farms.save(f).getId();
    }

    private String field(String uid, String name, String farmId, double area, String soil) {
        Field f = new Field();
        f.setUserId(uid);
        f.setName(name);
        f.setFarmId(farmId);
        f.setArea(area);
        f.setSoilType(soil);
        return fields.save(f).getId();
    }

    private String crop(String uid, String name, String season, int duration, String water) {
        Crop c = new Crop();
        c.setUserId(uid);
        c.setName(name);
        c.setSeason(season);
        c.setDuration(duration);
        c.setWaterRequirement(water);
        return crops.save(c).getId();
    }

    private void rotation(String uid, String fieldId, int year, String season, String cropId) {
        Rotation r = new Rotation();
        r.setUserId(uid);
        r.setFieldId(fieldId);
        r.setYear(year);
        r.setSeason(season);
        r.setCropId(cropId);
        rotations.save(r);
    }

    private void operation(String uid, String fieldId, String type, String date, String notes) {
        FieldOperation o = new FieldOperation();
        o.setUserId(uid);
        o.setFieldId(fieldId);
        o.setType(type);
        o.setDate(LocalDate.parse(date));
        o.setNotes(notes);
        operations.save(o);
    }

    private void expense(String uid, String fieldId, String cropId, String category, double amount,
                         String date, String description) {
        Expense e = new Expense();
        e.setUserId(uid);
        e.setFieldId(fieldId);
        e.setCropId(cropId);
        e.setCategory(category);
        e.setAmount(amount);
        e.setDate(LocalDate.parse(date));
        e.setDescription(description);
        expenses.save(e);
    }

    private void yieldRecord(String uid, String fieldId, String cropId, String harvestDate, double quantity) {
        YieldRecord y = new YieldRecord();
        y.setUserId(uid);
        y.setFieldId(fieldId);
        y.setCropId(cropId);
        y.setHarvestDate(LocalDate.parse(harvestDate));
        y.setQuantity(quantity);
        y.setUnit("Quintal");
        yields.save(y);
    }

    private String equipment(String uid, String name, String type, String status, String purchaseDate) {
        Equipment e = new Equipment();
        e.setUserId(uid);
        e.setName(name);
        e.setType(type);
        e.setStatus(status);
        e.setPurchaseDate(LocalDate.parse(purchaseDate));
        return equipment.save(e).getId();
    }

    private void maintenance(String uid, String equipmentId, String date, String nextDate, double cost,
                             String description) {
        Maintenance m = new Maintenance();
        m.setUserId(uid);
        m.setEquipmentId(equipmentId);
        m.setMaintenanceDate(LocalDate.parse(date));
        m.setNextMaintenanceDate(LocalDate.parse(nextDate));
        m.setCost(cost);
        m.setDescription(description);
        maintenance.save(m);
    }
}
