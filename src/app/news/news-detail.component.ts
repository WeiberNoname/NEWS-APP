import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from './news.service';
import { NewsArticle } from './news.model';
import { openUrl } from '@nativescript/core/utils';

@Component({
  selector: 'ns-news-detail',
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent implements OnInit {
  article: NewsArticle | undefined;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.newsService.getNewsArticle(id).subscribe(
      (article) => {
        this.article = article;
      },
      (error) => {
        console.error('Error fetching article:', error);
      }
    );
  }

  openArticleUrl(): void {
    if (this.article && this.article.url) {
      openUrl(this.article.url);
    }
  }
}