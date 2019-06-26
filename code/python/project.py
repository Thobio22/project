# This file is for cleaning and converting .csv files to .json for use in D3 .js files
# Name: Thomas Verouden
# Student number: 10779272
# python -m http.server 8888 &
# http://localhost:8888/project.html


import pandas as pd
import numpy as np
import json
from pprint import pprint



def clean_bee(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()
    dataframe.columns = dataframe.columns.str.replace(" ", "_")

    loss = "Total_Annual_Loss"

    # drop unneeded columns
    dataframe = dataframe[["State", loss, "fillKey"]]

    # remove the states without any data (Alaska & Puerto Rico)
    dataframe = dataframe.drop(index="AK", level=1)
    dataframe = dataframe.drop(index="PR", level=1)

    # total and dc are only relevant for line chart data (dc: district of columbia != state, therefore not in map)
    dataframe = dataframe.drop(index="TOTAL", level=1)
    dataframe = dataframe.drop(index="DC", level=1)

    # set values to numeric
    dataframe[loss] = pd.to_numeric(dataframe[loss])

    # set loss to %
    dataframe[loss] = round(dataframe[loss]*100, 1)

    return dataframe



def clean_bee_line(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()
    dataframe.columns = dataframe.columns.str.replace(" ", "_")

    loss = "Total_Annual_Loss"

    dataframe = dataframe[["Year", "State", "State_ISO", loss]]

    # set values to numeric
    dataframe[loss] = round(pd.to_numeric(dataframe[loss]), 3)
    dataframe["Year"] = pd.to_numeric(dataframe["Year"])

    # set loss to %
    dataframe[loss] = round(dataframe[loss]*100, 1)

    return dataframe



def clean_crop(dataframe):
    """
    This cleans unnecessary, empty and invalid values of the given dataset,
    and converts values to needed formats
    """

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()
    dataframe.columns = dataframe.columns.str.replace(" ", "_")

    # use relevant columns only
    value = "Value_in_Kg_per_Acre"
    dataframe = dataframe[["Year", "State_ISO", "State", value]]

    # set all different weight values to kg / acre, coerce errors to get NaN values on invalids
    dataframe[value] = pd.to_numeric(dataframe[value], errors="coerce")
    dataframe["Year"] = pd.to_numeric(dataframe["Year"])

    # drop rows with NaN
    dataframe = dataframe.dropna()

    return dataframe



def clean_cause(dataframe):
    """Cleans dataframe of empty/unnecessary values"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()
    dataframe.columns = dataframe.columns.str.replace(" ", "_")

    # drop unneaded column
    dataframe = dataframe.drop("State", axis=1)

    # set all percentages to numeric, coerce errors (NaN) to be actual NaN values
    columnList = ["Varroa_mites", "Other_pests_and_parasites", "Diseases", "Pesticides", "Other*", "Unknown"]

    for i in columnList:
        dataframe[i] = round(pd.to_numeric(dataframe[i], errors="ignore"), 1)


    return dataframe



def combine_crop(apple_df, pear_df, blueberry_df, cherry_df, peach_df, strawberry_df):
    """Combines the crop data into 1 dataframe"""
    lineData = {'AL': [], 'AK': [], 'AZ': [], 'AR': [], 'CA': [], 'CO': [], 'CT': [], \
                'DE': [], 'FL': [], 'GA': [], 'HI': [], 'ID': [], 'IL': [], 'IN': [], \
                'IA': [], 'KS': [], 'KY': [], 'LA': [], 'ME': [], 'MD': [], 'MA': [], \
                'MI': [], 'MN': [], 'MS': [], 'MO': [], 'MT': [], 'NE': [], 'NV': [], \
                'NH': [], 'NJ': [], 'NM': [], 'NY': [], 'NC': [], 'ND': [], 'OH': [], \
                'OK': [], 'OR': [], 'PA': [], 'RI': [], 'SC': [], 'SD': [], 'TN': [], \
                'TX': [], 'UT': [], 'VT': [], 'VA': [], 'WA': [], 'WV': [], 'WI': [], 'WY': [], 'TO': []}


    # maak lijst aan met opgetelde waardes die in lineData moeten
    for index, iso in enumerate(apple_df["State_ISO"]):
        if iso in lineData.keys():
            lineData[iso].append({"Year": int(apple_df["Year"][index]), "Kg_per_Acre": int(apple_df["Value_in_Kg_per_Acre"][index])})


    for index, iso in enumerate(pear_df["State_ISO"]):
        for year in range(2010, 2017):
                boolcheck_pear = True
                for j, object in enumerate(lineData[iso]):
                    # als staat + jaar al in lineData
                    if year == object["Year"]:
                            lineData[iso][j]["Kg_per_Acre"] = int(lineData[iso][j]["Kg_per_Acre"] + pear_df["Value_in_Kg_per_Acre"][index])
                            boolcheck = False
                    # als staat + jaar nog niet in lineData, voeg dan toe
                if boolcheck:
                        lineData[iso].append({"Year": int(pear_df["Year"][index]), "Kg_per_Acre": int(pear_df["Value_in_Kg_per_Acre"][index])})


    for index, iso in enumerate(peach_df["State_ISO"]):
        for year in range(2010, 2017):
                boolcheck = True
                for j, object in enumerate(lineData[iso]):
                    # als staat + jaar al in lineData
                    if year == object["Year"]:
                            lineData[iso][j]["Kg_per_Acre"] = int(lineData[iso][j]["Kg_per_Acre"] + peach_df["Value_in_Kg_per_Acre"][index])
                            boolcheck = False
                    # als staat + jaar nog niet in lineData, voeg dan toe
                if boolcheck:
                        lineData[iso].append({"Year": int(peach_df["Year"][index]), "Kg_per_Acre": int(peach_df["Value_in_Kg_per_Acre"][index])})


    return lineData



def format_bee_line(dataframe):
    """This manually places all relevant data on a state ISO index"""

    lineData = {'AL': [], 'AZ': [], 'AR': [], 'CA': [], 'CO': [], 'CT': [], 'DE': [], \
                'DC': [], 'FL': [], 'GA': [], 'HI': [], 'ID': [], 'IL': [], 'IN': [], \
                'IA': [], 'KS': [], 'KY': [], 'LA': [], 'ME': [], 'MD': [], 'MA': [], \
                'MI': [], 'MN': [], 'MS': [], 'MO': [], 'MT': [], 'NE': [], 'NV': [], \
                'NH': [], 'NJ': [], 'NM': [], 'NY': [], 'NC': [], 'ND': [], 'OH': [], \
                'OK': [], 'OR': [], 'PA': [], 'RI': [], 'SC': [], 'SD': [], 'TN': [], \
                'TX': [], 'UT': [], 'VT': [], 'VA': [], 'WA': [], 'WV': [], 'WI': [], \
                'WY': [], 'TO': []}


    # place relevant data in place
    for index, iso in enumerate(dataframe["State_ISO"]):
        lineData[iso].append({"Year": int(dataframe["Year"][index]), "Total_Annual_Loss": round(float(dataframe["Total_Annual_Loss"][index]), 1)})

    return lineData



def dump_in_json(dataframe, name):
    """Converts dataframe to nested dictionary and dumps it in a json file"""

    nested_dict = dataframe.groupby(level=0).apply(lambda dataframe: dataframe.xs(dataframe.name).to_dict(orient="index")).to_dict()

    with open ("Datasets/json/" + name + ".json", "w") as infile:
        json.dump(nested_dict, infile)



def convert_2_json(dataframe, name):
    """Converts dataframe to json"""

    with open ("Datasets/json/" + name + ".json", "w") as infile:
        json.dump(dataframe, infile)



if __name__ == "__main__":

    # read data into pandas df
    bee_df = pd.read_csv("Datasets/csv/bee_colony_loss.csv", delimiter=";", index_col = ["Year", "State ISO"])

    bee_line_df = pd.read_csv("Datasets/csv/bee_colony_loss.csv", delimiter=";")

    apple_df = pd.read_csv("Datasets/csv/apple_yield.csv", delimiter=";", )

    pear_df = pd.read_csv("Datasets/csv/pear_yield.csv", delimiter=";")

    peach_df = pd.read_csv("Datasets/csv/peach_yield.csv", delimiter=";")

    cause_df = pd.read_csv("Datasets/csv/causation_average_data.csv", delimiter=";", index_col = ["Year", "State ISO"])


    # clean the data
    bee_df = clean_bee(bee_df)
    bee_line_df = clean_bee_line(bee_line_df)
    apple_df = clean_crop(apple_df)
    pear_df = clean_crop(pear_df)
    peach_df = clean_crop(peach_df)
    cause_df = clean_cause(cause_df)

    crop_df = combine_crop(apple_df, pear_df, blueberry_df, cherry_df, peach_df, strawberry_df)

    bee_line_df = format_bee_line(bee_line_df)

    # convert the data to json
    dump_in_json(bee_df, "bee_colony_loss")
    dump_in_json(cause_df, "causation_data")

    convert_2_json(bee_line_df, "bee_loss_line")
    convert_2_json(crop_df, "combined_crop")
