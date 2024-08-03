# 🌍 TermorChartApp

## 📢 Disclaimer

This application does not own the data from the endpoints provided by the USGS Earthquake API. The data used in this application is for educational purposes only and not intended for commercial use. All data is sourced from the [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/), and full credit goes to the USGS (United States Geological Survey).


**TermorChartApp** is a React application designed to visualize earthquake data using Plotly.js. The app fetches data from the USGS Earthquake API, available at [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/), and creates various types of charts to help users analyze and understand earthquake occurrences.

## 🛠️ Technologies Used

The app leverages the following technologies:
- **⚛️ React**: For building the user interface and managing the state of the application.
- **🎨 Bootstrap**: For responsive design and styling.
- **📊 Plotly.js**: For creating interactive and visually appealing charts.
- **🔗 Axios**: For making HTTP requests to fetch data from the API.

## 📈 Available Charts

TermorChartApp offers a wide range of charts categorized into basic, statistical, and scientific charts:

### 🗺️ Map Box
- **Map Box**: Displays earthquake occurrences on an interactive map.

### 📉 Basic Charts
- **Scatter Plot**: Magnitude vs significance.
- **Bar Chart**: Visualizes earthquake numbers according to different magnitude ranges.
- **Pie Chart**: Represents event types and slices of magnitude ranges.

### 📊 Statistical Charts
- **Histograms**: *Coming soon*.
- **2D Density Plots**: *Coming soon*.

### 🔬 Scientific Charts
- **Heat Maps**: *Coming soon*.
- **Radar Charts**: *Coming soon*.

Stay tuned for more updates and features!

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
