import express from 'express';
import mongoose from 'mongoose';
import { ProjectModel } from "../models/Project.js";

const router = express.Router();

export const getProjects = async (req, res) => { 
    try {
        const projects = await ProjectModel.find();
                
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProject = async (req, res) => { 
    const { projectId } = req.params;

    try {
        const project = await ProjectModel.findById(projectId);
        
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProject = async (req, res) => {
    const { projectTitle, author, projectImage, projectLink, projectType, description, repository, projectLead, projectKey } = req.body;

    const newProject = new ProjectModel({ projectTitle, author, projectType, projectImage, projectLink, description, repository, projectLead, projectKey })
    try {
        await newProject.save();

        res.status(201).json("Project Created");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }   
}

export const editProject = async (req, res) => {
    const { projectId } = req.params;
    const { projectTitle, startDate, author, projectImage, projectLink, projectType, description, repository, projectLead, projectKey} = req.body;

    await ProjectModel.findOneAndUpdate(
        { "_id": projectId },
        {
            $set:{
                projectTitle: projectTitle,
                startDate: startDate,
                author: author,
                projectImage: projectImage,
                projectLink: projectLink,
                projectType: projectType,
                description: description,
                projectKey: projectKey,
                repository: repository,
                projectLead: projectLead,
            }
        },
        {new: true}
    );
    res.json("Project Updated");
}

export const deleteProject = async (req, res) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) return res.status(404).send(`No project with id: ${projectId}`);

    await ProjectModel.findByIdAndRemove(projectId);
    res.json("Project Deleted");
}