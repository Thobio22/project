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

    print(dataframe)

    # dataframe = dataframe[dataframe.State != "Alaska"]
    #
    # dataframe = dataframe[dataframe.State != "Puerto Rico"]


    # set year 2010/11 to 2010, etc.
    dataframe["Year"] = dataframe["Year"].str.replace("/11", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/12", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/13", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/14", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/15", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/16", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/17", "")


    # set values to numeric
    dataframe[loss] = pd.to_numeric(dataframe[loss])
    dataframe["Year"] = pd.to_numeric(dataframe["Year"])

    dataframe.set_index(["Year", "State_ISO"])


    return dataframe



def clean_crop(dataframe):
    """
    This cleans unnecessary, empty and invalid values of the given dataset,
    and converts values to needed formats
    """

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()

    dataframe.columns = dataframe.columns.str.replace(" ", "_")


    # set years to numeric
    dataframe["Year"] = pd.to_numeric(dataframe["Year"])

    value = "Value_Kg_per_Acre"


    # # use relevant columns only
    # dataframe = dataframe[["Year", "State", "State_ISO", value]]


    # remove , from value numbers
    # dataframe[value] = dataframe[value].str.replace(",", "")


    # remove unnecessary years for the linechart from the dataset
    dataframe = dataframe[dataframe.Year != 2007]
    dataframe = dataframe[dataframe.Year != 2008]
    dataframe = dataframe[dataframe.Year != 2009]
    dataframe = dataframe[dataframe.Year != 2017]
    dataframe = dataframe[dataframe.Year != 2018]


    # pprint(dataframe)
    print(dataframe.index)



    # set all different weight values to kg / acre
    dataframe[value] = pd.to_numeric(dataframe[value].str.replace(",", ""))

    print("pass")


    # set index of dataframe
    dataframe.set_index(["Year", "State_ISO"])


    return dataframe



def data_to_nested_dict(df, name):

    nested_dict = df.groupby(level=0).apply(lambda df: df.xs(df.name).to_dict(orient="index")).to_dict()

    with open (name + ".json", "w") as infile:
        json.dump(nested_dict, infile)



if __name__ == "__main__":

    # read data into pandas df

    bee_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";", index_col = ["Year", "State ISO"])


    # bee_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";", usecols=["Year", "State", "State ISO", "Total Annual Loss"])

    apple_df = pd.read_csv("Datasets/apple_yield_data.csv", delimiter=";", usecols=["Year", "State", "State ISO", "Value Kg per Acre"])

    pear_df = pd.read_csv("Datasets/pear_data.csv", delimiter=";", usecols=["Year", "State", "State ISO", "Value Kg per Acre"])






    # clean the data
    bee_df = clean_bee(bee_df)

    pprint(bee_df)

    # apple_df = clean_crop(apple_df)
    #
    # pear_df = clean_crop(pear_df)






    # # convert the data to json
    # data_to_nested_dict(bee_df, "bee_colony_loss")
    # data_to_nested_dict(apple_df, "apple_yield")
    # data_to_nested_dict(pear_df, "pear_yield")
