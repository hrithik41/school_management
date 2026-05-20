import db from '../config/db.js';
import { calculateDistance } from '../utils/distance.js';

export async function addSchool(req, res) {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            });
        }

        const school_latitude = parseFloat(latitude);
        const school_longitude = parseFloat(longitude);

        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ status: "error", message: "Invalid School Name." });
        }

        if (typeof address !== 'string' || address.trim() === '') {
            return res.status(400).json({ status: "error", message: "Invalid Address." });
        }

        if (isNaN(school_latitude) || school_latitude < -90 || school_latitude > 90) {
            return res.status(400).json({
                status: "error",
                message: "Invalid Latitude."
            });
        }

        if (isNaN(school_longitude) || school_longitude < -180 || school_longitude > 180) {
            return res.status(400).json({
                status: "error",
                message: "Invalid Longitude."
            });
        }

        const check_sql = `SELECT * FROM school WHERE school_name = ?`;
        const [check_result] = await db.query(check_sql, [name.trim()]);

        if (check_result.length > 0) {
            return res.status(400).json({ status: "error", message: "School Name already exists." });
        }

        const add_sql = `INSERT INTO school (school_name, school_address, school_latitude, school_longitude) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(add_sql, [name.trim(), address.trim(), school_latitude, school_longitude]);

        console.log("School Added Successfully : ", name);

        return res.status(201).json({
            status: "success",
            message: "School added successfully!",
            data: {
                id: result.insertId,
                name: name.trim(),
                address: address.trim(),
                latitude: school_latitude,
                longitude: school_longitude
            }
        });

    } catch (error) {
        console.error("Error in Adding School : ", error.message);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error."
        });
    }
}


export async function listSchools(req, res) {
    try {
        const { lat, long } = req.query;

        if (!lat || !long) {
            return res.status(400).json({
                status: "error",
                message: "Latitude and Longitude are required."
            });
        }

        const user_latitude = parseFloat(lat);
        const user_longitude = parseFloat(long);

        if (isNaN(user_latitude) || user_latitude < -90 || user_latitude > 90) {
            return res.status(400).json({
                status: "error",
                message: "Invalid Latitude."
            });
        }

        if (isNaN(user_longitude) || user_longitude < -180 || user_longitude > 180) {
            return res.status(400).json({
                status: "error",
                message: "Invalid Longitude."
            });
        }

        const list_sql = `SELECT * FROM school`;
        const [result] = await db.query(list_sql);

        const schoolsWithDistance = result.map(school => {
            const distance = calculateDistance(
                user_latitude,
                user_longitude,
                school.school_latitude,
                school.school_longitude
            );
            return {
                ...school,
                distance: parseFloat(distance.toFixed(2))
            };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        console.log("Schools Fetched Successfully for Coordinates : ", user_latitude, user_longitude);

        return res.status(200).json({
            status: "success",
            message: "Schools fetched successfully!",
            results: schoolsWithDistance.length,
            data: schoolsWithDistance
        });
    } catch (error) {
        console.error("Error in Listing Schools : ", error.message);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error."
        });
    }
}