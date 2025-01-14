import React from 'react';
import { FaHeartbeat, FaWeight, FaUserClock, FaBaby, FaTint, FaHandHoldingHeart, FaUserFriends } from 'react-icons/fa';

const NormalRanges = () => {
    const attributes = [
        { name: "Pregnancies", normalRange: "0-15 (individual history)", icon: <FaBaby /> },
        { name: "Glucose", normalRange: "70-100 mg/dL (fasting)", icon: <FaTint /> },
        { name: "Blood Pressure", normalRange: "80–120 mmHg", icon: <FaHeartbeat /> },
        { name: "Skin Thickness", normalRange: "10 - 20 mm (it can vary based on age, gender, and fitness level).", icon: <FaHandHoldingHeart /> },
        { name: "Insulin", normalRange: "16–166 mcU/mL", icon: <FaHeartbeat /> },
        { name: "BMI", normalRange: "18.5–24.9 kg/m²", icon: <FaWeight /> },
        { name: "Diabetes Pedigree Function", normalRange: "0.00 - 0.50 (higher suggests more risk)", icon: <FaUserFriends /> },
        { name: "Age", normalRange: "Varies by individual (age increases diabetes risk)", icon: <FaUserClock /> },
    ];

    return (
        <div className="bg-gradient-to-r min-h-screen py-10 px-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {attributes.map((attr, index) => (
                    <div className="border-2 border-inherit bg-gradient-to-r from-green-200 via-blue-300 to-purple-400 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                     key={index}>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="text-indigo-600 text-3xl animate-bounce">{attr.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800">{attr.name}</h3>
                        </div>
                        <p className="text-gray-600">{attr.normalRange}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NormalRanges;
