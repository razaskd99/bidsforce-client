'use client'
import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

// Importing the geography data directly from the public folder
import geoData from "../../public/features.json"

export default function MapChart() {
    return (
        <div className="max-h-[355px]">

        <ComposableMap>
            <Geographies geography={geoData}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        // Extract the bids value from the properties
                        const bids = parseInt(geo.properties.bids);

                        // Define color based on bids value
                        let fillColor;
                        if (bids >= 50) {
                            fillColor = "#0B9BB7"; // Dark purple for bids >= 50
                        } else if (bids >= 40) {
                            fillColor = "#63C6CC"; // Blue for bids >= 40
                        } else {
                            fillColor = "#EBF9F7"; // Default color for bids < 40
                        }

                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: {
                                        fill: fillColor,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#26869a", // Color on hover
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: "#26869a", // Color when pressed
                                        outline: "none",
                                    }
                                }}
                            />
                        );
                    })
                }
            </Geographies>
        </ComposableMap>
        </div>

    )
}
