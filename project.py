# This file is for cleaning and converting .csv files to .json for use in D3 .js files
# Name: Thomas Verouden
# Student number: 10779272
# python -m http.server 8888 &
# http://localhost:8888/project.html

# ISO code converter: https://www.tracemyip.org/tools/country-code-list-alpha-2-alhpa-3-converter/


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
    dataframe = dataframe[["State", loss]]


    # remove the states without any data (Alaska & Puerto Rico)
    dataframe = dataframe.drop(index="AK", level=1)

    dataframe = dataframe.drop(index="PR", level=1)


    # dataframe = dataframe[dataframe.State != "Alaska"]
    #
    # dataframe = dataframe[dataframe.State != "Puerto Rico"]


    ## set index year 2010/11 to 2010, etc.
    # dataframe["Year"] = dataframe["Year"].str.replace("/11", "")
    # dataframe["Year"] = dataframe["Year"].str.replace("/12", "")
    # dataframe["Year"] = dataframe["Year"].str.replace("/13", "")
    # dataframe["Year"] = dataframe["Year"].str.replace("/14", "")
    # dataframe["Year"] = dataframe["Year"].str.replace("/15", "")
    # dataframe["Year"] = dataframe["Year"].str.replace("/16", "")
    # dataframe["Year"] = dataframe["Year"].str.replace("/17", "")


    # set values to numeric
    dataframe[loss] = pd.to_numeric(dataframe[loss])


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
    value = "Value_Kg_per_Acre"

    dataframe = dataframe[["State", value]]


    # remove , from value numbers
    # dataframe[value] = dataframe[value].str.replace(",", "")


    # remove unnecessary years for the linechart from the dataset
    dataframe = dataframe.drop(index=2007, level=0)
    dataframe = dataframe.drop(index=2008, level=0)
    dataframe = dataframe.drop(index=2009, level=0)
    dataframe = dataframe.drop(index=2017, level=0)
    dataframe = dataframe.drop(index=2018, level=0)


    # dataframe = dataframe[dataframe.Year != 2007]
    # dataframe = dataframe[dataframe.Year != 2008]
    # dataframe = dataframe[dataframe.Year != 2009]
    # dataframe = dataframe[dataframe.Year != 2017]
    # dataframe = dataframe[dataframe.Year != 2018]


    # set all different weight values to kg / acre, coerce errors to get NaN values on invalids
    dataframe[value] = pd.to_numeric(dataframe[value], errors="coerce")

    # # set index of dataframe
    # dataframe.set_index(["Year", "State_ISO"])


    return dataframe



def dump_in_json(dataframe, name):
    """Converts dataframe to nested dictionary and dumps it in a json file"""

    nested_dict = dataframe.groupby(level=0).apply(lambda dataframe: dataframe.xs(dataframe.name).to_dict(orient="index")).to_dict()
    print(nested_dict)

    with open (name + ".json", "w") as infile:
        json.dump(nested_dict, infile)

    # jsonFile = dataframe.to_json(name + ".json")



if __name__ == "__main__":

    # read data into pandas df

    bee_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";", index_col = ["Year", "State ISO"])

    apple_df = pd.read_csv("Datasets/apple_yield_data.csv", delimiter=";", index_col = ["Year", "State ISO"])

    pear_df = pd.read_csv("Datasets/pear_data.csv", delimiter=";", index_col = ["Year", "State ISO"])


    # bee_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";", usecols=["Year", "State", "State ISO", "Total Annual Loss"])
    #
    # apple_df = pd.read_csv("Datasets/apple_yield_data.csv", delimiter=";", usecols=["Year", "State", "State ISO", "Value Kg per Acre"])
    #
    # pear_df = pd.read_csv("Datasets/pear_data.csv", delimiter=";", usecols=["Year", "State", "State ISO", "Value Kg per Acre"])






    # clean the data
    bee_df = clean_bee(bee_df)

    pprint(bee_df)

    apple_df = clean_crop(apple_df)

    pear_df = clean_crop(pear_df)






    # convert the data to json
    dump_in_json(bee_df, "bee_colony_loss")
    dump_in_json(apple_df, "apple_yield")
    dump_in_json(pear_df, "pear_yield")
