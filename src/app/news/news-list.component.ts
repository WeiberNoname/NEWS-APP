import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { NewsArticle } from './news.model';

@Component({
  selector: 'ns-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit {
  newsArticles: NewsArticle[] = [];
  errorMessage: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.newsService.getNews().subscribe(
      (articles) => {
        this.newsArticles = articles;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.errorMessage = 'Failed to load news. Please try again later.';
      }
    );
  }
}