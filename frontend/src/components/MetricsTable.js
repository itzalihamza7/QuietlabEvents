import React from 'react';
import '../assets/MetricsTable.css'; // Adjust the path based on your folder structure

const MetricsTable = ({ data }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Offer URL</th>
                    <th>Offer Template</th>
                    <th>Total Visits</th>
                    <th>Total Purchases</th>
                    <th>Total Upsell</th>
                    <th>Total Purchase Value</th>
                    <th>Total Upsell Value</th>
                    <th>Total Value</th>
                    <th>Average Order Value</th>
                    <th>Conversion Rate</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.offer_url}</td>
                        <td>{row.offer_template}</td>
                        <td>{row.totalVisits}</td>
                        <td>{row.totalPurchases}</td>
                        <td>{row.totalUpsell}</td>
                        <td>{row.totalPurchaseValue}</td>
                        <td>{row.totalUpsellValue}</td>
                        <td>{row.totalValue}</td>
                        <td>{row.averageOrderValue}</td>
                        <td>{row.conversionRate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MetricsTable;
