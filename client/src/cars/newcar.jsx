import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Typography } from '@mui/material';
import { TextField, Checkbox } from '@mui/material';
import { Grid } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import { useContext } from "react";
import { DataContext } from "../App";

import MenuItem from '@mui/material/MenuItem';



const URL = "/api/cars/new";

function NewCar({ addCarNow, setShowState }) {

    const { user } = useContext(DataContext);

    const history = useHistory();

    const typesOfDifferentFuels = [
        {id: "Petrol", value: "Petrol", name: "Petrol"}, 
        {id: "Diesel", value: "Diesel", name: "Diesel"}, 
        {id: "Electric", value: "Electric", name: "Electric"}, 
        {id: "Hybrid", value: "Hybrid", name: "Hybrid"}, 
        {id: "Hydrogen", value: "Hydrogen", name: "Hydrogen"}
    ]

    const createCar = async (info) => {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info)
        });
        const data = await res.json();
        console.log(data);
        addCarNow(data);
    }


    const validationSchema = yup.object({
        brand: yup
            .string('Enter Car Brand')
            .required('Brand is required'),
        model: yup
            .string('Enter your model')
            .required('Model is required'),
        original_owner: yup
            .string('Enter the original owner')
            .required('Owner is required'),
        rental_rate: yup
            .string('Enter the rental rate')
            .required('Rental rate is required'),
        rented_days: yup
            .string('Enter the rented days'),
        mileage: yup
            .number('What is the mileage'),
        horsepower: yup
            .string('Enter the horsepower'),
        fuel_consumption: yup
            .number('Enter the fuel consumption'),
        estimated_range: yup
            .number('Enter the range'),
        manual: yup
            .boolean('Is it a manual car?'),
        fuelType: yup
            .string('Enter the Fuel Type')
            .required('Fuel type is required'),
        images: yup
            .string('Image for your vehicle'),
        key_features: yup
            .string('Any key features?'),
        description: yup
            .string('Enter a description'),

    });

    const formik = useFormik({
        initialValues: {
            brand: "",
            model: "",
            original_owner: user?._id,
            rental_rate: "",
            rented_days: 0,
            mileage: "",
            horsepower: "",
            fuel_consumption: "",
            estimated_range: "",
            manual: false,
            fuelType: "",
            images: "",
            key_features: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createCar(values);
            history.push(`/users/${user?._id}/`);
            formik.resetForm();
            setShowState(false);
        },
    });



    return (
        <Grid container>
            <Typography variant="h3">Add New Car</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField sx={{m:1}}
                    fullWidth
                    id="brand"
                    name="brand"
                    label="brand"
                    type="string"
                    value={formik.values.brand}
                    onChange={formik.handleChange}
                    error={formik.touched.brand && Boolean(formik.errors.brand)}
                    helperText={formik.touched.brand && formik.errors.brand}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="model"
                    name="model"
                    label="model"
                    type="string"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    error={formik.touched.model && Boolean(formik.errors.model)}
                    helperText={formik.touched.model && formik.errors.model}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="rental_rate"
                    name="rental_rate"
                    label="Rental Rate ($/day)"
                    type="number"
                    value={formik.values.rental_rate}
                    onChange={formik.handleChange}
                    error={formik.touched.rental_rate && Boolean(formik.errors.rental_rate)}
                    helperText={formik.touched.rental_rate && formik.errors.rental_rate}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="mileage"
                    name="mileage"
                    label="Mileage (km)"
                    type="number"
                    value={formik.values.mileage}
                    onChange={formik.handleChange}
                    error={formik.touched.mileage && Boolean(formik.errors.mileage)}
                    helperText={formik.touched.mileage && formik.errors.mileage}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="horsepower"
                    name="horsepower"
                    label="Horsepower"
                    type="number"
                    value={formik.values.horsepower}
                    onChange={formik.handleChange}
                    error={formik.touched.horsepower && Boolean(formik.errors.horsepower)}
                    helperText={formik.touched.horsepower && formik.errors.horsepower}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="fuel_consumption"
                    name="fuel_consumption"
                    label="Fuel Consumption (liters/100km)"
                    type="number"
                    value={formik.values.fuel_consumption}
                    onChange={formik.handleChange}
                    error={formik.touched.fuel_consumption && Boolean(formik.errors.fuel_consumption)}
                    helperText={formik.touched.fuel_consumption && formik.errors.fuel_consumption}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="estimated_range"
                    name="estimated_range"
                    label="Estimated range (km)"
                    type="number"
                    value={formik.values.estimated_range}
                    onChange={formik.handleChange}
                    error={formik.touched.estimated_range && Boolean(formik.errors.estimated_range)}
                    helperText={formik.touched.estimated_range && formik.errors.estimated_range}
                />
                <label>Manual:</label>
                <Checkbox
                    id="manual"
                    name="manual"
                    label="Manual"
                    checked={formik.values.manual}
                    onChange={formik.handleChange}
                    error={formik.touched.manual && Boolean(formik.errors.manual)}
                // helperText={formik.touched.manual && formik.errors.manual}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="fuelType"
                    name="fuelType"
                    label="Fuel Type"
                    select
                    value={formik.values.fuelType}
                    onChange={formik.handleChange}
                    error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}
                    helperText={formik.touched.fuelType && formik.errors.fuelType}
                >
                    <MenuItem key={""} value={""}>
                        Select a fuel type:
                    </MenuItem>
                    {typesOfDifferentFuels.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField sx={{m: 1}}
                    fullWidth
                    id="images"
                    name="images"
                    label="images"
                    type="string"
                    value={formik.values.images}
                    onChange={formik.handleChange}
                    error={formik.touched.images && Boolean(formik.errors.images)}
                    helperText={formik.touched.images && formik.errors.images}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="key_features"
                    name="key_features"
                    label="key_features"
                    type="string"
                    value={formik.values.key_features}
                    onChange={formik.handleChange}
                    error={formik.touched.key_features && Boolean(formik.errors.key_features)}
                    helperText={formik.touched.key_features && formik.errors.key_features}
                />
                <TextField sx={{m: 1}}
                    fullWidth
                    id="description"
                    name="description"
                    label="description"
                    type="string"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.key_features && Boolean(formik.errors.key_features)}
                    helperText={formik.touched.key_features && formik.errors.key_features}
                />
                <Button sx={{m: 1}} color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </Grid>
    );
};

export default NewCar;