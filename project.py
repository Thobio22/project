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
    dataframe = dataframe[["State", loss, "Average_loss_per_year"]]


    # remove the states without any data (Alaska & Puerto Rico)
    dataframe = dataframe.drop(index="AK", level=1)

    dataframe = dataframe.drop(index="PR", level=1)


    # set values to numeric
    dataframe[loss] = round(pd.to_numeric(dataframe[loss]), 3)
    dataframe["Average_loss_per_year"] = round(pd.to_numeric(dataframe["Average_loss_per_year"], errors="coerce"), 3)


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

    dataframe = dataframe[["State", value]]


    # remove unnecessary years for the linechart from the dataset
    if 2007 in dataframe.index:
        dataframe = dataframe.drop(index=2007, level=0)
    if 2008 in dataframe.index:
        dataframe = dataframe.drop(index=2008, level=0)
    if 2009 in dataframe.index:
        dataframe = dataframe.drop(index=2009, level=0)
    if 2017 in dataframe.index:
        dataframe = dataframe.drop(index=2017, level=0)
    if 2018 in dataframe.index:
        dataframe = dataframe.drop(index=2018, level=0)


    # set all different weight values to kg / acre, coerce errors to get NaN values on invalids
    dataframe[value] = pd.to_numeric(dataframe[value], errors="coerce")

    return dataframe



def clean_cause(dataframe):
    """Cleans dataframe of empty/unnecessary values"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()

    dataframe.columns = dataframe.columns.str.replace(" ", "_")


    # set all percentages to numeric, coerce errors (NaN) to be actual NaN values
    dataframe["Varroa_mites"] = pd.to_numeric(dataframe["Varroa_mites"], errors="coerce")
    dataframe["Other_pests_and_parasites"] = pd.to_numeric(dataframe["Other_pests_and_parasites"], errors="coerce")
    dataframe["Diseases"] = pd.to_numeric(dataframe["Diseases"], errors="coerce")
    dataframe["Pesticides"] = pd.to_numeric(dataframe["Pesticides"], errors="coerce")
    dataframe["Other"] = pd.to_numeric(dataframe["Other"], errors="coerce")
    dataframe["Unknown"] = pd.to_numeric(dataframe["Unknown"], errors="coerce")

    return dataframe



def dump_in_json(dataframe, name):
    """Converts dataframe to nested dictionary and dumps it in a json file"""

    nested_dict = dataframe.groupby(level=0).apply(lambda dataframe: dataframe.xs(dataframe.name).to_dict(orient="index")).to_dict()

    with open (name + ".json", "w") as infile:
        json.dump(nested_dict, infile)



if __name__ == "__main__":

    # read data into pandas df

    bee_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";", index_col = ["Year", "State ISO"])

    bee_line_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";")

    apple_df = pd.read_csv("Datasets/apple_yield_data.csv", delimiter=";", index_col = ["Year", "State ISO"])

    pear_df = pd.read_csv("Datasets/pear_data.csv", delimiter=";", index_col = ["Year", "State ISO"])

    blueberry_df = pd.read_csv("Datasets/blueberry_yield.csv", delimiter=";", index_col = ["Year", "State ISO"])

    cherry_df = pd.read_csv("Datasets/cherry_yield.csv", delimiter=";", index_col = ["Year", "State ISO"])

    peach_df = pd.read_csv("Datasets/peach_yield.csv", delimiter=";", index_col = ["Year", "State ISO"])

    strawberry_df = pd.read_csv("Datasets/strawberry_yield.csv", delimiter=";", index_col = ["Year", "State ISO"])

    cause_df = pd.read_csv("Datasets/causation_average_data.csv", delimiter=";", index_col = ["Year", "State ISO"])


    # clean the data
    bee_df = clean_bee(bee_df)

    bee_line_df = clean_bee_line(bee_line_df)

    apple_df = clean_crop(apple_df)

    pear_df = clean_crop(pear_df)

    blueberry_df = clean_crop(blueberry_df)

    cherry_df = clean_crop(cherry_df)

    peach_df = clean_crop(peach_df)

    strawberry_df = clean_crop(strawberry_df)

    cause_df = clean_cause(cause_df)
    # print(cause_df)


    bee_line_df = bee_line_df.set_index("State_ISO").to_json("bee_line_loss.json", orient="index")

    # convert the data to json
    dump_in_json(bee_df, "bee_colony_loss")
    dump_in_json(apple_df, "apple_yield")
    dump_in_json(pear_df, "pear_yield")
    dump_in_json(blueberry_df, "blueberry_yield")
    dump_in_json(cherry_df, "cherry_yield")
    dump_in_json(peach_df, "peach_yield")
    dump_in_json(strawberry_df, "strawberry_yield")

    # dump_in_json(cause_df, "causation_data")
