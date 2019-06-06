import pandas as pd
import numpy as np
import json



def clean_bee(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.lstrip()
    dataframe.columns = dataframe.columns.str.rstrip()


    taloss = "Total Annual Loss"

    # select needed columns
    dataframe = dataframe[["Year", "State", taloss]]


    # remove the states without any data (Alaska & Puerto Rico)
    dataframe = dataframe[dataframe.State != "Alaska"]

    dataframe = dataframe[dataframe.State != "Puerto Rico"]


    # set percentage value to numeric, by removing % from string and str to numeric
    dataframe[taloss] = dataframe[taloss].str.replace("%", "")


    for i in dataframe[taloss]:
        # print(i)
        if i.isnull():
            print("nan gevonden")

    return dataframe



def clean_crop(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    dataframe = dataframe[["Year", "State", "Data Item", "Value"]]

    dataframe["Value"] = dataframe["Value"].str.replace(".", "")

    dataframe = interpolate(dataframe)



    # dataframe["Value"] = pd.to_numeric(dataframe["Value"])


    # for i in dataframe["Value"]:
    #     if i > 999:
    #         print(i)

    return dataframe


def interpolate(dataframe):
    """This is a script for interolating missing data of the USDA quickstats datasets"""
    for i in dataframe:
        print(i)




def convert2json(dataframe):
    """This converts the given dataframe to a .json file"""
    jsonFile = appel_df.to_json('appel_data.json', orient="records")




if __name__ == "__main__":

    # read data into pandas appel_df
    bijen_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";")

    # clean the data
    bijen_df = clean_bee(bijen_df)




    # appel_df = pd.read_csv("Datasets/appel_yield_data.csv", delimiter=";")







    # appel_df = clean_crop(appel_df)


    # convert2json(appel_df)
