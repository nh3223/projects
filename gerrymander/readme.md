# Congressional Redistricting Model

## Background

Following on the 2020 census and the congressional elections a year from now, states are currently in the process of redistricting their legislative districts.  As has become routine practice, the parties in charge of each state's legislature will try to maximize the number of districts that will elect a representative from their political party, a practice known as gerrymandering.  The result of gerrymandering is often the creation of ridiculous snake-like districts.

## The Model

The model uses US census data and Tiger shapefiles as a data source.  Its only consideration is the geographic distribution of a state's population.  No more granular characterstics such as race, gender, political party or voting records are used.  

The original model was to create a constrained K means clustering model that ensured that each district had an equal population.  However, this proved unstable as the combination of the constraint and randomness failed to provide consistent results, even when considering an ensemble of different model runs.  The current iteration of the model is more repeatable.  It takes an outside/in approach by finding the furthest unassigned census tract from the center of population and assigning the closest neighbors until the target population is reached, at which point the next district repeats the process until all census tracts are assigned.  After this initial assignments an iterative process is used to ensure that all census tracts in a particular district are contiguous and all districts are close enough in population.

## Technology Stack

The census data and Tiger shapefiles are imported into QGIS.  The base python script is adapted from the QGIS processing toolbox and the model uses an object oriented approach to develop the model.