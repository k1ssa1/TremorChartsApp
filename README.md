# 🌍 TermorChartApp

## 📢 Disclaimer

This application does not own the data from the endpoints provided by the USGS Earthquake API. The data used in this application is for educational purposes only and not intended for commercial use. All data is sourced from the [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/), and full credit goes to the USGS (United States Geological Survey).


**TermorChartApp** is a React application designed to visualize earthquake data using Plotly.js. The app fetches data from the USGS Earthquake API, available at [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/), and creates various types of charts to help users analyze and understand earthquake occurrences.

## 🌐 Live Demo
The app is live on Netlify! Feel free to use it at [cozy-torrone-db02c4.netlify.app](https://cozy-torrone-db02c4.netlify.app).

## 📈 Available Charts

TermorChartApp offers a wide range of charts categorized into basic, statistical, and scientific charts:

### 🕒 Real-Time Data Table
- **Real-Time Data Displayer**: A table that shows the latest earthquakes, categorizing them by magnitude with green for low, orange for medium, and red for high. The table displays the event type, event location, time, magnitude, and a link for more details.

### 🗺️ Map Box
- **Map Box**: Displays earthquake occurrences on an interactive map.

### 📉 Basic Charts
- **Scatter Plot**: Magnitude vs significance.
- **Bar Chart**: Visualizes earthquake numbers according to different magnitude ranges.
- **Pie Chart**: Represents event types and slices of magnitude ranges.

### 📊 Statistical Charts
- **Histograms**: Includes a magnitude distribution chart and a depth distribution diagram.
- **2D Density Plots**: Features a geographic distribution chart and a depth vs magnitude chart.

### 🔬 Scientific Charts
- **Heat Maps**: *Coming soon*.
- **Radar Charts**: *Coming soon*.

Stay tuned for more updates and features!

## 🛠️ Technologies Used

The app leverages the following technologies:
- **⚛️ React**: For building the user interface and managing the state of the application.
- **🎨 Bootstrap**: For responsive design and styling.
- **📊 Plotly.js**: For creating interactive and visually appealing charts.
- **🔗 Axios**: For making HTTP requests to fetch data from the API.