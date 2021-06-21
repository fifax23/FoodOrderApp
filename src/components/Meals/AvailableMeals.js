import React, { useState, useEffect, useCallback } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card/Card';

const AvailableMeals = () => {
    const [mealsData, setMealsData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMealsData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                'https://food-order-df3f4-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }
            setMealsData(loadedMeals);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        fetchMealsData();
    }, [fetchMealsData]);

    const mealsList = mealsData.map((meal) => {
        return (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    let content = <p>Found no meals.</p>;

    if (mealsData.length > 0) {
        content = <ul>{mealsList}</ul>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (error) {
        content = <p>Something went wrong...</p>;
    }

    return (
        <section className={classes.meals}>
            <Card>{content}</Card>
        </section>
    );
};

export default AvailableMeals;
