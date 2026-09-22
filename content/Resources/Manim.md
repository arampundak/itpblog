#resource #code 

https://docs.manim.community/en/stable/faq/installation.html#why-are-there-different-versions-of-manim

Manim was originally created by Grant Sanderson as a personal project and for use in his YouTube channel, [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw). As his channel gained popularity, many grew to like the style of his animations and wanted to use manim for their own projects. However, as manim was only intended for personal use, it was very difficult for other users to install and use it.

In late 2019, Grant started working on faster OpenGL rendering in a new branch, known as the `shaders` branch. In mid-2020, a group of developers forked it into what is now the community edition; this is the version documented on this website. In early 2021, Grant merged the shaders branch back into master, making it the default branch in his repository – and this is what `manimgl` is. The old version, before merging the `shaders` branch is sometimes referred to as `ManimCairo` and is, at this point, only useful for one singular purpose: rendering Grant’s old videos locally on your machine. It is still available in his GitHub repository in form of the `cairo-backend` branch.

To summarize:

- [**Manim**, or **ManimCE**](https://manim.community/) refers to the community maintained version of the library. This is the version documented on this website; the package name on PyPI is [`manim`](https://pypi.org/project/manim/).
    
- [ManimGL](https://github.com/3b1b/manim) is the latest released version of the version of the library developed by Grant “3b1b” Sanderson. It has more experimental features and breaking changes between versions are not documented. Check out its documentation [here](https://3b1b.github.io/manim/index.html); on PyPI the package name is [`manimgl`](https://pypi.org/project/manimgl/).
    
- [ManimCairo](https://github.com/3b1b/manim/tree/cairo-backend) is the name that is sometimes used for the old, pre-OpenGL version of `manimgl`. The latest version of it is available [on PyPI as `manimlib`](https://pypi.org/project/manimgl/), but note that if you intend to use it to compile some old project of Grant, you will likely have to install the exact version from the time the project was created from source.
